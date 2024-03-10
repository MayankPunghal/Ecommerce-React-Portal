import React, { useState } from 'react';

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
                <div key={product.productID} className={`relative max-w-sm rounded overflow-hidden shadow-lg ${!product.isActive ? 'grayscale' : ''}`}>
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
                            <span className={product.isActive ? 'text-green-500' : 'text-red-500'}>
                                {product.isActive ? 'Active' : 'Inacitve'}
                            </span>
                        )}
                    </div>
                    <img className="w-full" src={"C:\\Users\\Mayank.Punghal\\Downloads\\" + product.imageName} alt={product.productName} />
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
                                                ProductName: parseInt(e.target.value),
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
                                                Description: parseInt(e.target.value),
                                            }))
                                        }
                                    />) :
                                (
                                    <div>
                                        {product.description}
                                    </div>
                                )
                            }
                        </div>
                        <div className="text-gray-700 text-sm mb-2">{editingProductId === product.productID ?
                            (
                                <input
                                    className="border border-gray-800 p-2 rounded mr-2 w-32"
                                    type="text"
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
                                        type="text"
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
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    value={updatedProduct.CategoryId}
                                    onChange={(e) =>
                                        setUpdatedProduct((prevProduct) => ({
                                            ...prevProduct,
                                            CategoryId: parseInt(e.target.value),
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
                                        className={`bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green`}
                                        onClick={() => handleUpdateProduct(product.productID)}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className={`bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red ml-2`}
                                        onClick={() => handleEditClick(null)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="ml-4">
                                        <button
                                            className={`bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow`}
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
                                            className={`bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red ml-2 ${!product.isActive ? 'pointer-events-none' : ''}`}
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

