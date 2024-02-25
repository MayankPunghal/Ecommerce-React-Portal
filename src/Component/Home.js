import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { showToast } from '../UtilComponent/ToastUtil';

const Home = () => {
  const UserInfo = JSON.parse(localStorage.getItem('userData'));
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

  const fetchCategories = async () => {
    try {
      const response = await axios.post('/api/1/products/getcategories', userData);

      if (response.data.status === 1) {
        setCategories(response.data.categoryList);
      } else {
        console.error('Error fetching categories:', response.data.message);
      }
    } catch (error) {
      console.error('An unexpected error occurred while fetching categories:', error);
    }
  };
  useEffect(() => {
  fetchCategories();
}, []);

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
      const response = await axios.post('/api/1/products/setcategory', newCategory);

      if (response.data.status === 1) {
        showToast('Category created successfully.');
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
        showToast(`Error creating category: ${response.data.message}`, false);
      }
    } catch (error) {
      showToast('An unexpected error occurred while creating category.', false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await axios.post('/api/1/products/deletecategory', {
          UserData: userData.UserData,
          CategoryId: categoryId,
        });

        if (response.data.status === 1) {
          showToast('Category deleted successfully.');
          fetchCategories();
        } else {
          showToast(`Error deleting category: ${response.data.message}`, false);
        }
      } catch (error) {
        showToast('An unexpected error occurred while deleting category.', false);
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

  const handleUpdateCategory = async (categoryId) => {
    try {
      const response = await axios.post('/api/1/products/updatecategory', {
        ...updatedCategory,
        CategoryId: categoryId,
      });

      if (response.data.status === 1) {
        showToast('Category updated successfully.');
        setEditingCategoryId(null);
        setUpdatedCategory({
          CategoryName: '',
          CategoryDescription: '',
        });
        fetchCategories();
      } else {
        showToast(`Error updating category: ${response.data.message}`, false);
      }
    } catch (error) {
      showToast('An unexpected error occurred while updating category.', false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">CATEGORIES</h2>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue absolute top-4 right-4"
        onClick={handlePopupToggle}
      >
        Create Category
      </button>

      {isPopupOpen && (
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
            </form>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4">
        <table className="w-full border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="border border-gray-800 p-2">Category Name</th>
              <th className="border border-gray-800 p-2">Category Description</th>
              <th className="border border-gray-800 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoryId}>
                <td className="border border-gray-800 p-2" style={{ width: "200px" }}>
                  {editingCategoryId === category.categoryId ? (
                    <input
                      type="text"
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
      </div>
    </div>
  );
};

export default Home;
