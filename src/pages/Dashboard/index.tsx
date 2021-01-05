import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const { data } = await api.get('foods');
      setFoods(data);
    }

    loadFoods();
  }, []);

  async function handleUpdateAvailability(food: IFoodPlate): Promise<void> {
    await api.put(`foods/${food.id}`, food);
    const { data } = await api.get('foods');
    setFoods(data);
  }

  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const foodData = { ...food, available: true };
      const response = await api.post('foods', foodData);
      const newFoods = [...foods, response.data];
      setFoods(newFoods);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const newFood = { ...editingFood, ...food };
      const response = await api.put(`foods/${editingFood.id}`, newFood);
      setFoods(
        foods.map(mappedFood =>
          mappedFood.id === editingFood.id ? { ...response.data } : mappedFood,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteFood(id: number): Promise<void> {
    try {
      await api.delete(`foods/${id}`);
      const newFoods = foods.filter(food => food.id !== id);
      setFoods(newFoods);
    } catch (error) {
      console.log(error);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              handleUpdateAvailability={handleUpdateAvailability}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
