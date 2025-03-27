// src/pages/AdminPage.js
import React from "react";
import { Admin, Resource } from "react-admin";
import { List, Datagrid, TextField, EditButton, DeleteButton } from "react-admin";
import axios from "axios";

// API URL для связи с бэкендом
const apiUrl = "http://127.0.0.1:8000/api"; // замените на свой URL бэкенда

// Настройка для доступа к данным
const dataProvider = {
  getList: async (resource, params) => {
    const response = await axios.get(`${apiUrl}/${resource}`);
    return {
      data: response.data,
      total: response.data.length,
    };
  },
  getOne: async (resource, params) => {
    const response = await axios.get(`${apiUrl}/${resource}/${params.id}`);
    return { data: response.data };
  },
  // Добавьте остальные методы (create, update, delete) по мере необходимости
};

const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <TextField source="content" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const AdminPage = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="posts" list={PostList} />
    </Admin>
  );
};

export default AdminPage;
