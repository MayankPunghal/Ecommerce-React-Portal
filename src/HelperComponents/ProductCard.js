import React, { useState } from 'react';
import ImageUtil from '../UtilComponent/ImageUtil'; 
const ToggleButton = ({ value, onChange }) => {
    return (
        <input
            type="checkbox"
            id="isActive"
            checked={value}
            onChange={() => onChange(!value)}
            className={`p-2 rounded cursor-pointer ${value ? 'bg-green-500' : 'bg-red-500'}`}
        />
    );
};

const ProductCard = ({
    products,
    setEditingProductId,
    editingProductId,
    handleDeleteProduct,
    handleUpdateProduct,
    updatedProduct,
    setUpdatedProduct,
    categoriesList
}) => {
    const handleEditClick = (
        productId,
        productName,
        description,
        price,
        stockQuantity,
        imageName,
        isActive,
        categoryId
    ) => {
        setEditingProductId(productId);
        setUpdatedProduct({
            ...updatedProduct,
            ProductName: productName,
            Description: description,
            Price: price,
            StockQuantity: stockQuantity,
            ImageName: imageName,
            IsActive: isActive,
            CategoryId: categoryId,
        });
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={product.productID} className={`relative max-w-sm rounded-lg border-t-2 shadow-lg shadow-slate-400 ${!product.isActive ? 'grayscale' : ''}`}>
                    <div className="absolute top-2 right-2 p-2">
                        {editingProductId === product.productID ? (
                            <ToggleButton
                                value={updatedProduct.IsActive}
                                onChange={(value) =>
                                    setUpdatedProduct((prevProduct) => ({
                                        ...prevProduct,
                                        IsActive: value,
                                    }))
                                }
                            />
                        ) : (
                            <></>
                            // <span className={product.isActive ? 'text-green-500' : 'text-red-500'}>
                            //     {product.isActive ? 'Active' : 'In-Active'}
                            // </span>
                        )}
                    </div>
                    <div className={`flex items-center justify-center h-48 pt-4`}>
                        {/* <img className="object-cover w-auto h-auto max-h-48" src={`/Images/Products/${product.imageName}`} alt={product.productName} /> */}
                        <ImageUtil imageCategory="Products" imageName={product.imageName} altName={product.ProductName}/>
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                            {editingProductId === product.productID ?
                                (
                                    <input
                                        className="border border-gray-800 p-2 rounded w-48"
                                        type="text"
                                        value={updatedProduct.ProductName}
                                        onChange={(e) =>
                                            setUpdatedProduct((prevProduct) => ({
                                                ...prevProduct,
                                                ProductName: e.target.value,
                                            }))
                                        }
                                    />) :
                                (
                                    <div>
                                        {product.productName}
                                    </div>
                                )
                            }
                        </div>
                        <div className="h-16">
                            <div className="text-gray-700 text-base mb-2">
                                {editingProductId === product.productID ?
                                    (
                                        <input
                                            className="border border-gray-800 p-2 rounded w-64"
                                            type="text"
                                            value={updatedProduct.Description}
                                            onChange={(e) =>
                                                setUpdatedProduct((prevProduct) => ({
                                                    ...prevProduct,
                                                    Description: e.target.value,
                                                }))
                                            }
                                        />) :
                                    (
                                        <div className="overflow-hidden overflow-ellipsis">
                                            {product.description}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="text-gray-700 text-sm mb-2">{editingProductId === product.productID ?
                            (
                                <input
                                    className="border border-gray-800 p-2 rounded mr-2 w-32"
                                    type="number"
                                    value={updatedProduct.Price}
                                    onChange={(e) =>
                                        setUpdatedProduct((prevProduct) => ({
                                            ...prevProduct,
                                            Price: parseInt(e.target.value),
                                        }))
                                    }
                                />) :
                            (
                                <div>
                                    {"₹" + product.price}
                                </div>
                            )
                        }</div>
                        <div className="text-gray-700 text-sm mb-2">
                            <div className="flex">{editingProductId === product.productID ?
                                (
                                    <input
                                        className="border border-gray-800 p-2 rounded mr-2 w-12"
                                        type="number"
                                        value={updatedProduct.StockQuantity}
                                        onChange={(e) =>
                                            setUpdatedProduct((prevProduct) => ({
                                                ...prevProduct,
                                                StockQuantity: parseInt(e.target.value),
                                            }))
                                        }
                                    />) :
                                (
                                    <div>{product.stockQuantity} pcs
                                    </div>
                                )
                            }
                            </div>
                        </div>
                        {/* <div className={product.isActive ? 'text-green-500 mb-2' : 'text-red-500 mb-2'}>
                            Is Active :

                        </div> */}
                        <div className="text-gray-700 text-sm mb-2">
                            Category:
                            {editingProductId === product.productID ? (
                                <select
                                    className="mt-1 p-2 border border-gray-800 rounded w-full"
                                    value={updatedProduct.CategoryId}
                                    onChange={(e) =>
                                        setUpdatedProduct((prevProduct) => ({
                                            ...prevProduct,
                                            CategoryId: e.target.value,
                                        }))
                                    }
                                >
                                    {categoriesList.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                // Find the corresponding CategoryName from the list of categories
                                categoriesList.find((category) => category.categoryId === product.categoryId)?.categoryName || 'N/A'
                            )}
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <div className="flex items-center">
                            {editingProductId === product.productID ? (
                                <>
                                    <button
                                        className={`text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
                                        onClick={() => handleUpdateProduct(product.productID)}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className={`text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
                                        onClick={() => handleEditClick(null)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="ml-4">
                                        <button
                                            className={`text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
                                            onClick={() =>
                                                handleEditClick(
                                                    product.productID,
                                                    product.productName,
                                                    product.description,
                                                    product.price,
                                                    product.stockQuantity,
                                                    product.imageName,
                                                    product.isActive,
                                                    product.categoryId
                                                )}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={`text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${!product.isActive ? 'pointer-events-none' : ''}`}
                                            onClick={() => handleDeleteProduct(product.productID)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCard;

