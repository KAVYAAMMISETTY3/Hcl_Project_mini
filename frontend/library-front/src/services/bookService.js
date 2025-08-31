
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/books';

const getBooks = () => axios.get(API_URL);

const getBook = id => axios.get(`${API_URL}/${id}`);

const addBook = book => axios.post(API_URL, book);

const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);

const deleteBook = id => axios.delete(`${API_URL}/${id}`);

export default { getBooks, getBook, addBook, updateBook, deleteBook };
