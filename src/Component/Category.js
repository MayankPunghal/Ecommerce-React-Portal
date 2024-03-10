import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { showToast } from '../UtilComponent/ToastUtil';
import { ClipLoader } from 'react-spinners';
import Pagination from '../UtilComponent/PaginationUtil'
import useAuth from '../UtilComponent/AuthUtil';
import {Link} from 'react-router-dom'


const Category = () => {
  const UserInfo = JSON.parse(localStorage.getItem('userData'));
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const { checkTokenValidity } = useAuth();
  const [categories, setCategories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    UserData: {
      token: null,
      userId: parseInt(UserInfo.userId),
    },
    CategoryName: '',
    CategoryDescription: '',
  });

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState({
    CategoryName: '',
    CategoryDescription: '',
  });
  const userData = {
    UserData: {
      token: null,
      userId: parseInt(UserInfo.userId),
    },
  };
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [visibleCategories, setVisibleCategories] = useState([]);
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const startIdx = (page - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      const newVisibleCategories = categories.slice(startIdx, endIdx);
      setVisibleCategories(newVisibleCategories);
      setCurrentPage(page);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.post('/api/1/products/getcategories', userData);

      if (response.data.status === 1) {
        setCategories(response.data.categoryList);
      } else {
        console.error('Error fetching categories:', response.data.message);
        showToast(`Error : ${response.data.message}`,false, 2000);
      }
    } catch (error) {
      showToast(`Error : ${error.response.data}`,false, 2000);
      console.error(`Error : ${error.response.data}`, error);
      if(error.response.status === 401)
      {
        checkTokenValidity();
      }
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check token expiration when the component mounts
    checkTokenValidity();
  }, []);
  useEffect(() => {
  fetchCategories();
}, []);
useEffect(() => {
  // Set the initial visible categories when categories change
  const initialVisibleCategories = categories.slice(0, itemsPerPage);
  setVisibleCategories(initialVisibleCategories);
}, [categories]);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleCreateCategory = async () => {
    try {
      const response = await axiosInstance.post('/api/1/products/setcategory', newCategory);

      if (response.data.status === 1) {
        showToast('Category created successfully.',true, 1000);
        fetchCategories();
        setIsPopupOpen(false);
        setNewCategory({
          UserData: {
            token: null,
            userId: parseInt(UserInfo.userId),
          },
          CategoryName: '',
          CategoryDescription: '',
        });
      } else {
        showToast(`Error creating category: ${response.data.message}`, false, 2000);
      }
    } catch (error) {
      showToast(`Error : ${error.response.data}`, false, 2000);
      console.error(`Error : ${error.response.data}`, error);
      if(error.response.status === 401)
      {
        checkTokenValidity();
      }
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await axiosInstance.post('/api/1/products/deletecategory', {
          UserData: userData.UserData,
          CategoryId: categoryId,
        });

        if (response.data.status === 1) {
          showToast('Category deleted successfully.', true, 1000);
          fetchCategories();
        } else {
          showToast(`Error deleting category: ${response.data.message}`, false, 2000);
        }
      } catch (error) {
        showToast(`Error : ${error.response.data}`,false);
      console.error(`Error : ${error.response.data}`, error);
      if(error.response.status === 401)
      {
        checkTokenValidity();
      }
      }
    }
  };

  const handleEditClick = (categoryId, categoryName, categoryDescription) => {
    setEditingCategoryId(categoryId);
    setUpdatedCategory({
      ...updatedCategory,
      CategoryName: categoryName,
      CategoryDescription: categoryDescription,
    });
  };

  const handleEscapeKeyPress = (e) => {
    if (e.key === 'Escape') {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []);

  const handleUpdateCategory = async (categoryId) => {
    try {
      const response = await axiosInstance.post('/api/1/products/updatecategory', {
        ...updatedCategory,
        CategoryId: categoryId,
      });

      if (response.data.status === 1) {
        showToast('Category updated successfully.', true, 1000);
        setEditingCategoryId(null);
        setUpdatedCategory({
          CategoryName: '',
          CategoryDescription: '',
        });
        fetchCategories();
      } else {
        showToast(`Error updating category: ${response.data.message}`, false, 2000);
      }
    } catch (error) {
      showToast(`Error : ${error.response.data}`,false, 2000);
      console.error(`Error : ${error.response.data}`, error);
      if(error.response.status === 401)
      {
        checkTokenValidity();
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-5">
      <Link to="/Ecom/home" className="text-blue-500 hover:underline text-xl"> Back </Link>
      <div className="flex justify-between items-center mb-4">
    <h2 className="text-3xl mb-4">CATEGORIES</h2>
    <button
      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue top-4 right-4"
      onClick={handlePopupToggle}
    >
      Create Category
    </button>
    </div>
      {!loading && isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-600">
                  Category Name:
                </label>
                <input
                  type="text"
                  id="categoryName"
                  name="CategoryName"  // Change from "categoryName" to "CategoryName"
                  value={newCategory.CategoryName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-600">
                  Category Description:
                </label>
                <input
                  type="text"
                  id="categoryDescription"
                  name="CategoryDescription"  // Change from "categoryDescription" to "CategoryDescription"
                  value={newCategory.CategoryDescription}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleCreateCategory}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              >
                Create
              </button>
              <button
                type="button"
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red ml-2"
                onClick={() => {
                  setIsPopupOpen(false);
                  setNewCategory({
                    UserData: {
                      token: null,
                      userId: parseInt(UserInfo.userId),
                    },
                    CategoryName: '',
                    CategoryDescription: '',
                  });
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4">
      {!loading && 
      <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="border border-gray-800 p-2">Category Name</th>
              <th className="border border-gray-800 p-2">Category Description</th>
              <th className="border border-gray-800 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleCategories.map((category) => (
              <tr key={category.categoryId}>
                <td className="border border-gray-800 p-2" style={{ width: "200px" }}>
                  {editingCategoryId === category.categoryId ? (
                    <input
                      type="text"
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                      value={updatedCategory.CategoryName}
                      required
                      onChange={(e) =>
                        setUpdatedCategory((prevCategory) => ({
                          ...prevCategory,
                          CategoryName: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    category.categoryName
                  )}
                </td>
                <td className="border border-gray-800 p-2" style={{ width: "500px" }}>
                  {editingCategoryId === category.categoryId ? (
                    <input
                      type="text"
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                      value={updatedCategory.CategoryDescription}
                      required
                      onChange={(e) =>
                        setUpdatedCategory((prevCategory) => ({
                          ...prevCategory,
                          CategoryDescription: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    category.categoryDescription
                  )}
                </td>
                <td className="border border-gray-800 p-2" style={{ width: "150px" }}>
                  {editingCategoryId === category.categoryId ? (
                    <>
                      <button
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                        onClick={() => handleUpdateCategory(category.categoryId)}
                      >
                        Submit
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red ml-2"
                        onClick={() => {
                          setEditingCategoryId(null);
                          setUpdatedCategory({
                            CategoryName: '',
                            CategoryDescription: '',
                          });
                        }}
                      >
                        X
                      </button>
                    </>
                  ) : (
                    <div>
                      <button
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow"
                        onClick={() =>
                          handleEditClick(
                            category.categoryId,
                            category.categoryName,
                            category.categoryDescription
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red ml-2"
                        onClick={() => handleDeleteCategory(category.categoryId)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>}
      {!loading &&<Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />}
        {loading && <div className="flex justify-center items-center">
        <ClipLoader color={'#123abc'} loading={loading} size={50} />
      </div>}
      </div>
    </div>
  )
};

export default Category;
