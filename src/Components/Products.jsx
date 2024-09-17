import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;  // Number of cards per page

    async function getProductsHandler() {
        try {
            setIsLoading(true);
            const apiRes = await fetch('https://dummyjson.com/products');
            const result = await apiRes.json();
            if (result.products) {
                setProducts(result.products || []);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProductsHandler();
    }, []);

    // Calculate pagination
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (isLoading) return <h2>Getting products, please wait ......</h2>;

    return (
        <div className={styles.body}>
            <h1 className={styles.heading}>PRODUCTS</h1>
            <div className={styles.container}>
                {currentProducts.length > 0 ? (
                    currentProducts.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <img src={item.thumbnail} alt={item.title} className={styles.cardImage} />
                                    <h2 className={styles.cardTitle}>{item.title}</h2>
                                </div>
                                <div className={styles.cardTable}>
                                    <div className={styles.cardRow}>
                                        <div className={styles.cardLabel}>Category:</div>
                                        <div className={styles.cardValue}>{item.category}</div>
                                    </div>
                                    <div className={styles.cardRow}>
                                        <div className={styles.cardLabel}>Price:</div>
                                        <div className={styles.cardValue}>${item.price}</div>
                                    </div>
                                    <div className={styles.cardRow}>
                                        <div className={styles.cardLabel}>Stock:</div>
                                        <div className={styles.cardValue}>{item.stock}</div>
                                    </div>
                                    <div className={styles.cardRow}>
                                        <div className={styles.cardLabel}>Rating:</div>
                                        <div className={styles.cardValue}>⭐{item.rating}</div>
                                    </div>
                                    <div className={styles.cardRow}>
                                        <div className={styles.cardLabel}>Warranty Information:</div>
                                        <div className={styles.cardValue}>{item.warrantyInformation}</div>
                                    </div>
                                    <div className={styles.cardRow}>
                                        <div className={styles.cardLabel}>Return Policy:</div>
                                        <div className={styles.cardValue}>{item.returnPolicy}</div>
                                    </div>
                                    <div className={styles.cardRow}>
                                        <div className={styles.cardLabel}>Availability Status:</div>
                                        <div className={styles.cardValue}>{item.availabilityStatus}</div>
                                    </div>
                                    <div className={styles.cardRow}>
                                        <div className={styles.cardLabel}>Description:</div>
                                        <div className={styles.cardValue}>{item.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Error fetching products</p>
                )}
            </div>
            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.arrowButton}>
                    &laquo; {/* Left arrow */}
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.arrowButton}>
                    &raquo; {/* Right arrow */}
                </button>
            </div>
        </div>
    );
}
