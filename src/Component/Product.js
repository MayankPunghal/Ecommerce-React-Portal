import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showToast } from '../UtilComponent/ToastUtil';
import { ClipLoader } from 'react-spinners';
import Pagination from '../UtilComponent/PaginationUtil';
import useAuth from '../UtilComponent/AuthUtil';
import { Link } from 'react-router-dom'
import ProductCard from '../HelperComponents/ProductCard'

const Product = () => {
  const UserInfo = JSON.parse(localStorage.getItem('userData'));
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const { checkTokenValidity } = useAuth();
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    UserData: {
      token: null,
      userId: parseInt(UserInfo.userId),
    },
    ProductName: '',
    Description: '',
    Price: 0,
    StockQuantity: 0,
    ImageName: '',
    IsActive: true,
    CategoryId: null,
  });

  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    ProductName: '',
    Description: '',
    Price: 0,
    StockQuantity: 0,
    ImageName: '',
    IsActive: true,
    CategoryId: null,
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
  const [visibleProducts, setVisibleProducts] = useState([]);
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const startIdx = (page - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      const newVisibleProducts = products ? products.slice(startIdx, endIdx) : [];
      setVisibleProducts(newVisibleProducts);
      setCurrentPage(page);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.post('/api/1/products/getproducts', userData);

      if (response.data.status === 1) {
        setProducts(response.data.productList);
      } else {
        console.error('Error fetching products:', response.data.message);
      }
    } catch (error) {
      showToast(`Error : ${error.response.data}`, false, 2000);
      console.error(`Error : ${error.response.data}`, error);
      if (error.response.status === 401) {
        checkTokenValidity();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch categories list
    const fetchCategoriesList = async () => {
      try {
        const response = await axiosInstance.post('/api/1/products/getcategories', userData);

        if (response.data.status === 1) {
          setCategoriesList(response.data.categoryList);
        } else {
          console.error('Error fetching categories:', response.data.message);
        }
      } catch (error) {
        showToast(`Error : ${error.response.data}`, false, 2000);
        console.error(`Error : ${error.response.data}`, error);
        if (error.response.status === 401) {
          checkTokenValidity();
        }
      }
    };

    fetchCategoriesList();
  }, []);

  useEffect(() => {
    // Set the initial visible products when products change
    const initialVisibleProducts = products ? products.slice(0, itemsPerPage) : [];
    setVisibleProducts(initialVisibleProducts);
  }, [products]);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
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

  const handleCreateProduct = async () => {
    try {
      const response = await axiosInstance.post('/api/1/products/setproduct', newProduct);

      if (response.data.status === 1) {
        showToast('Product created successfully.', true, 1000);
        fetchProducts();
        setIsPopupOpen(false);
        setNewProduct({
          UserData: {
            token: null,
            userId: parseInt(UserInfo.userId),
          },
          ProductName: '',
          Description: '',
          Price: 0,
          StockQuantity: 0,
          ImageName: '',
          IsActive: true,
          CategoryId: null,
        });
      } else {
        showToast(`Error creating product: ${response.data.message}`, false);
      }
    } catch (error) {
      showToast(`Error : ${error.response.data}`, false, 2000);
      console.error(`Error : ${error.response.data}`, error);
      if (error.response.status === 401) {
        checkTokenValidity();
      }
    }
  };

  const ToggleButton = ({ value, onChange }) => {
    const handleClick = () => {
        onChange(!value);
    };

    return (
        <button
            className={`p-2 rounded ${value ? 'bg-green-500' : 'bg-red-500'} text-white hover:opacity-50 hover:bg-yellow-500 hover:text-black`}
            onClick={handleClick}
        >
            {value ? 'Yes' : 'No'}
        </button>
    );
};

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axiosInstance.post('/api/1/products/deleteproduct', {
          UserData: userData.UserData,
          ProductId: productId,
        });

        if (response.data.status === 1) {
          showToast('Product deleted successfully.', true, 1000);
          fetchProducts();
        } else {
          showToast(`Error deleting product: ${response.data.message}`, false, 2000);
        }
      } catch (error) {
        showToast('An unexpected error occurred while deleting product.', false, 2000);
      }
    }
  };

  // const handleEditClick = (
  //   productId,
  //   productName,
  //   description,
  //   price,
  //   stockQuantity,
  //   imageName,
  //   isActive,
  //   categoryId
  // ) => {
  //   setEditingProductId(productId);
  //   setUpdatedProduct({
  //     ...updatedProduct,
  //     ProductName: productName,
  //     Description: description,
  //     Price: price,
  //     StockQuantity: stockQuantity,
  //     ImageName: imageName,
  //     IsActive: isActive,
  //     CategoryId: categoryId,
  //   });
  // };

  const handleUpdateProduct = async (productId) => {
    try {
      const response = await axiosInstance.post('/api/1/products/updateproduct', {
        ...updatedProduct,
        ProductId: productId,
      });

      if (response.data.status === 1) {
        showToast('Product updated successfully.', true, 1000);
        setEditingProductId(null);
        setUpdatedProduct({
          ProductName: '',
          Description: '',
          Price: 0,
          StockQuantity: 0,
          ImageName: '',
          IsActive: true,
          CategoryId: null,
        });
        fetchProducts();
      } else {
        showToast(`Error updating product: ${response.data.message}`, false, 2000);
      }
    } catch (error) {
      showToast(`Error : ${error.response.data}`, false, 2000);
      console.error(`Error : ${error.response.data}`, error);
      if (error.response.status === 401) {
        checkTokenValidity();
      }
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto mt-5">
      <Link to="/Ecom/home" className="text-blue-500 hover:underline text-xl">Back</Link>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl mb-4">PRODUCTS</h2>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue top-4 right-4"
          onClick={handlePopupToggle}
        >
          Create Product
        </button>
      </div>
      {!loading && isPopupOpen && (
        <div
          className="modal-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="bg-white p-8 rounded shadow-md max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-96">
              <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="ProductName"
                    value={newProduct.ProductName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                    Description:
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="Description"
                    value={newProduct.Description}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                    Price:
                  </label>
                  <input
                    type="text"
                    pattern="[0-9]*"
                    id="price"
                    name="Price"
                    value={newProduct.Price}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-600">
                    Stock Quantity:
                  </label>
                  <input
                    type="text"
                    pattern="[0-9]*"
                    id="stockQuantity"
                    name="StockQuantity"
                    value={newProduct.StockQuantity}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="imageName" className="block text-sm font-medium text-gray-600">
                    Image Name:
                  </label>
                  <input
                    type="text"
                    id="imageName"
                    name="ImageName"
                    value={newProduct.ImageName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                {/* User will always create a new Product in Active state only */}
                {/* <div className="mb-4">
                  <label htmlFor="isActive" className="block text-sm font-medium text-gray-600">
                    Is Active:
                  </label>
                  <select
                    id="isActive"
                    name="IsActive"
                    value={newProduct.IsActive}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div> */}
                <div className="mb-4">
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-600">
                    Category Name:
                  </label>
                  <select
                    id="categoryId"
                    name="CategoryId"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    value={newProduct.CategoryId}
                    onChange={handleInputChange}
                  >
                    {categoriesList.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleCreateProduct}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                  Create
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red ml-2"
                  onClick={() => {
                    setIsPopupOpen(false);
                    setNewProduct({
                      UserData: {
                        token: null,
                        userId: parseInt(UserInfo.userId),
                      },
                      ProductName: '',
                      Description: '',
                      Price: 0,
                      StockQuantity: 0,
                      ImageName: '',
                      IsActive: true,
                      CategoryId: null,
                    });
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4">
        {!loading
          //#region  New Card Style
          && (
            <ProductCard
              products={visibleProducts}
              setEditingProductId = {setEditingProductId}
              editingProductId ={editingProductId}
              handleDeleteProduct={handleDeleteProduct}
              handleUpdateProduct={handleUpdateProduct}
              updatedProduct = {updatedProduct}
              setUpdatedProduct = {setUpdatedProduct}
              categoriesList={categoriesList}
            />
          )
          //#endregion

          //Old Table Format not in use anymore
          //#region 
          // && (
          //   <table className="w-full table-auto border-collapse border border-gray-800">
          //     <thead>
          //       <tr>
          //         <th className="border border-gray-800 p-2">Product Name</th>
          //         <th className="border border-gray-800 p-2">Description</th>
          //         <th className="border border-gray-800 p-2">Price</th>
          //         <th className="border border-gray-800 p-2">Stock Quantity</th>
          //         <th className="border border-gray-800 p-2">Image</th>
          //         <th className="border border-gray-800 p-2">Is Active</th>
          //         <th className="border border-gray-800 p-2">Category ID</th>
          //         <th className="border border-gray-800 p-2">Actions</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {visibleProducts.map((product) => (
          //         <tr key={product.productID}>
          //           <td className="border border-gray-800 p-2" style={{ width: '200px' }}>
          //             {editingProductId === product.productID ? (
          //               <input
          //                 className="mt-1 p-2 border border-gray-300 rounded w-full"
          //                 type="text"
          //                 value={updatedProduct.ProductName}
          //                 required
          //                 onChange={(e) =>
          //                   setUpdatedProduct((prevProduct) => ({
          //                     ...prevProduct,
          //                     ProductName: e.target.value,
          //                   }))
          //                 }
          //               />
          //             ) : (
          //               product.productName
          //             )}
          //           </td>
          //           <td className="border border-gray-800 p-2" style={{ width: '200px' }}>
          //             {editingProductId === product.productID ? (
          //               <input
          //                 className="mt-1 p-2 border border-gray-300 rounded w-full"
          //                 type="text"
          //                 value={updatedProduct.Description}
          //                 onChange={(e) =>
          //                   setUpdatedProduct((prevProduct) => ({
          //                     ...prevProduct,
          //                     Description: e.target.value,
          //                   }))
          //                 }
          //               />
          //             ) : (
          //               product.description
          //             )}
          //           </td>
          //           <td className="border border-gray-800 p-2" style={{ width: '80px' }}>
          //             {editingProductId === product.productID ? (
          //               <input
          //                 className="mt-1 p-2 border border-gray-300 rounded w-full"
          //                 type="text"
          //                 pattern="[0-9]*"
          //                 value={updatedProduct.Price}
          //                 required
          //                 onChange={(e) =>
          //                   setUpdatedProduct((prevProduct) => ({
          //                     ...prevProduct,
          //                     Price: e.target.value,
          //                   }))
          //                 }
          //               />
          //             ) : (
          //               product.price
          //             )}
          //           </td>
          //           <td className="border border-gray-800 p-2" style={{ width: '75px' }}>
          //             {editingProductId === product.productID ? (
          //               <input
          //                 className="mt-1 p-2 border border-gray-300 rounded w-full"
          //                 type="text"
          //                 pattern="[0-9]*"
          //                 value={updatedProduct.StockQuantity}
          //                 required
          //                 onChange={(e) =>
          //                   setUpdatedProduct((prevProduct) => ({
          //                     ...prevProduct,
          //                     StockQuantity: e.target.value,
          //                   }))
          //                 }
          //               />
          //             ) : (
          //               product.stockQuantity
          //             )}
          //           </td>
          //           <td className="border border-gray-800 p-2" style={{ width: '150px' }}>
          //             {editingProductId === product.productID ? (
          //               <input
          //                 className="mt-1 p-2 border border-gray-300 rounded w-full"
          //                 type="text"
          //                 value={updatedProduct.ImageName}
          //                 onChange={(e) =>
          //                   setUpdatedProduct((prevProduct) => ({
          //                     ...prevProduct,
          //                     ImageName: e.target.value,
          //                   }))
          //                 }
          //               />
          //             ) : (
          //               product.imageName
          //             )}
          //           </td>
          //           <td className="border border-gray-800 p-2" style={{ width: '70px' }}>
          //             {editingProductId === product.productID ? (
          //               <ToggleButton
          //                 value={updatedProduct.IsActive}
          //                 onChange={(value) =>
          //                   setUpdatedProduct((prevProduct) => ({
          //                     ...prevProduct,
          //                     IsActive: value,
          //                   }))
          //                 }
          //               />
          //             ) : (
          //               <span className={product.isActive ? 'text-green-500' : 'text-red-500'}>
          //                 {product.isActive ? 'Yes' : 'No'}
          //               </span>
          //             )}
          //           </td>
          //           {/* instead of manual entry of CategoryId and Showing a number, we are showing name and picking the category from a drop down input */}
          //           {/* <td className="border border-gray-800 p-2" style={{ width: '100px' }}>
          //           {editingProductId === product.productID ? (
          //             <input
          //               type="text"
          //               pattern="[0-9]*"
          //               value={updatedProduct.CategoryId || ''}
          //               onChange={(e) =>
          //                 setUpdatedProduct((prevProduct) => ({
          //                   ...prevProduct,
          //                   CategoryId: e.target.value === '' ? null : parseInt(e.target.value),
          //                 }))
          //               }
          //             />
          //           ) : (
          //             product.categoryId
          //           )}
          //         </td> */}
          //           <td className="border border-gray-800 p-2" style={{ width: '120px' }}>
          //             {editingProductId === product.productID ? (
          //               <select
          //                 className="mt-1 p-2 border border-gray-300 rounded w-full"
          //                 value={updatedProduct.CategoryId}
          //                 onChange={(e) =>
          //                   setUpdatedProduct((prevProduct) => ({
          //                     ...prevProduct,
          //                     CategoryId: parseInt(e.target.value),
          //                   }))
          //                 }
          //               >
          //                 {categoriesList.map((category) => (
          //                   <option key={category.categoryId} value={category.categoryId}>
          //                     {category.categoryName}
          //                   </option>
          //                 ))}
          //               </select>
          //             ) : (
          //               // Find the corresponding CategoryName from the list of categories
          //               categoriesList.find((category) => category.categoryId === product.categoryId)?.categoryName || ''
          //             )}
          //           </td>

          //           <td className="border border-gray-800 p-2" style={{ width: '120px' }}>
          //             {editingProductId === product.productID ? (
          //               <>
          //                 <button
          //                   className="bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
          //                   onClick={() => handleUpdateProduct(product.productID)}
          //                 >
          //                   Submit
          //                 </button>
          //                 <button
          //                   className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red ml-2"
          //                   onClick={() => {
          //                     setEditingProductId(null);
          //                     setUpdatedProduct({
          //                       productName: '',
          //                       description: '',
          //                       price: 0,
          //                       stockQuantity: 0,
          //                       imageName: '',
          //                       isActive: true,
          //                       categoryId: null,
          //                     });
          //                   }}
          //                 >
          //                   X
          //                 </button>
          //               </>
          //             ) : (
          //               <div>
          //                 <button
          //                   className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow"
          //                   onClick={() =>
          //                     handleEditClick(
          //                       product.productID,
          //                       product.productName,
          //                       product.description,
          //                       product.price,
          //                       product.stockQuantity,
          //                       product.imageName,
          //                       product.isActive,
          //                       product.categoryId
          //                     )
          //                   }
          //                 >
          //                   Edit
          //                 </button>
          //                 <button
          //                   className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red ml-2"
          //                   onClick={() => handleDeleteProduct(product.productID)}
          //                 >
          //                   Delete
          //                 </button>
          //               </div>
          //             )}
          //           </td>
          //         </tr>
          //       ))}
          //     </tbody>
          //   </table>
          // )
          //#endregion
        }
        {/* {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )} */}
        {loading && (
          <div className="flex justify-center items-center">
            <ClipLoader color={'#123abc'} loading={loading} size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
