import React, { useState } from 'react';
import {addRecord, deleteRecord, updateRecord, getRecords, getRecordById} from '../global/firebaseFunctions'

const handleAddRecord = () => {
  const collectionName = 'users';
  const newRecordData = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    city: 'New York',
  };
  const recordId = 'user123';

  // Call the addRecord function with the provided data.
  addRecord(collectionName, newRecordData, recordId);
};

const handleDeleteRecord = () => {
  const recordId = 'user123';

  // Call the addRecord function with the provided data.
  deleteRecord('users', recordId);
}

const handleUpdateRecord = () => {
  const newRecordData = {
    name: 'John Doe',
    age: 232
  };
  const recordId = 'user123';

  // Call the addRecord function with the provided data.
  updateRecord('users', recordId, newRecordData);
}

function handleGetAllRecords(){
  const collectionName = 'users';
  getRecords(collectionName).then(records => {
    console.log(records);
  });
}

function handleGetOneRecord(){
  const recordId = 'user123'; 
  const collectionName = 'users';
  getRecordById(collectionName, recordId).then(record => {
    console.log(record);
  });
}

function TestFunctions() {
  return (
    <div>
    <button onClick={handleAddRecord}>
      Add Record
    </button>

    <button onClick={handleDeleteRecord}>
      Delete Record
    </button>

    <button onClick={handleUpdateRecord}>
      Update Record
    </button>

    <button onClick={handleGetAllRecords}>
      Get Records
    </button>

    <button onClick={handleGetOneRecord}>
      Get Single Record
    </button>
    </div>
  );
}

export default TestFunctions;