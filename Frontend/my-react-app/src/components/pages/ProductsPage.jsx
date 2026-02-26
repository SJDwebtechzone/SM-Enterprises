import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/css/ProductsPage.css';
import ProductDetail from './productdetail';
import ErrorBoundary from './ErrorBoundary';

/* ── Category icon map (emoji fallback) ─────────────────── */
const categoryIcon = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('bell')) return '🔔';
    if (n.includes('lantern')) return '🏮';
    if (n.includes('oil')) return '🕯️';
    if (n.includes('undial') || n.includes('hundi')) return '🪔';
    if (n.includes('vilakku')) return '✨';
    if (n.includes('kalasam')) return '🏺';
    if (n.includes('drum')) return '🥁';
    return '🪷';
};

/* ── Stars renderer ──────────────────────────────────────── */
const Stars = ({ rating = 0 }) => (
    <div className="pp-card-stars">
        {[...Array(5)].map((_, i) => (
            <i key={i} className={`bi ${i < Math.round(rating) ? 'bi-star-fill' : 'bi-star'}`} />
        ))}
    </div>
);

/* ── Image URL helper ────────────────────────────────────── */
const imgUrl = (src) => {
    if (!src) return '/placeholder.png';
    return src.startsWith('http') ? src : `${import.meta.env.VITE_BACKEND_URL}${src}`;
};

/* ── Single Product Card ─────────────────────────────────── */
const ProductCard = ({ product, quantities, setQuantities, onAddToCart, onAddToWishlist, wishlist, onView }) => {
    const id = product._id;
    const qty = quantities[id] || 1;
    const inWishlist = wishlist.some(w => w._id === id);

    const changeQty = (delta) =>
        setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));

    return (
        <div className="pp-card" role="article">
            {/* Image */}
            <div className="pp-card-img-wrap">
                <img
                    src={imgUrl(product.image)}
                    alt={product.name}
                    className="pp-card-img"
                    loading="lazy"
                />
                {product.discount && <span className="pp-card-badge">{product.discount}</span>}

                {/* Hover overlay quick-actions */}
                <div className="pp-card-overlay">
                    <button
                        className="pp-overlay-btn"
                        title="Quick View"
                        onClick={(e) => { e.stopPropagation(); onView(product); }}
                    >
                        <i className="bi bi-eye" />
                    </button>
                    <button
                        className="pp-overlay-btn"
                        title="Add to Cart"
                        onClick={(e) => { e.stopPropagation(); onAddToCart({ ...product, quantity: qty }); }}
                    >
                        <i className="bi bi-cart-plus" />
                    </button>
                    <button
                        className={`pp-overlay-btn ${inWishlist ? 'active' : ''}`}
                        title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        onClick={(e) => { e.stopPropagation(); onAddToWishlist({ ...product, quantity: qty }); }}
                        style={{ color: inWishlist ? '#e53935' : undefined }}
                    >
                        <i className={`bi ${inWishlist ? 'bi-heart-fill' : 'bi-heart'}`} />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="pp-card-body">
                <div className="pp-card-name">{product.name}</div>

                <div className="pp-card-price">
                    {product.sale ? (
                        <>
                            <span className="pp-card-sale">₹{product.sale}</span>
                            <span className="pp-card-mrp">₹{product.price}</span>
                        </>
                    ) : (
                        <span className="pp-card-sale">₹{product.price}</span>
                    )}
                </div>

                <Stars rating={product.averageRating} />

                {/* Qty */}
                <div className="pp-qty">
                    <button onClick={() => changeQty(-1)}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => changeQty(1)}>+</button>
                </div>

                {/* Action buttons */}
                <div className="pp-card-actions">
                    <button className="pp-btn-view" onClick={() => onView(product)} title="View Details">
                        <i className="bi bi-eye" /> View
                    </button>
                    <button
                        className="pp-btn-cart"
                        onClick={() => onAddToCart({ ...product, quantity: qty })}
                        title="Add to Cart"
                    >
                        <i className="bi bi-cart-plus" /> Cart
                    </button>
                    <button
                        className={`pp-btn-wish ${inWishlist ? 'active' : ''}`}
                        onClick={() => onAddToWishlist({ ...product, quantity: qty })}
                        title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                        <i className={`bi ${inWishlist ? 'bi-heart-fill' : 'bi-heart'}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── Skeleton loader row ─────────────────────────────────── */
const SkeletonRow = () => (
    <div className="pp-product-grid">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="pp-card">
                <div className="pp-card-img-wrap pp-skeleton" style={{ height: 200 }} />
                <div className="pp-card-body" style={{ gap: 8, display: 'flex', flexDirection: 'column' }}>
                    <div className="pp-skeleton" style={{ height: 14, width: '80%', borderRadius: 4 }} />
                    <div className="pp-skeleton" style={{ height: 12, width: '55%', borderRadius: 4 }} />
                    <div className="pp-skeleton" style={{ height: 30, width: '100%', borderRadius: 8, marginTop: 10 }} />
                </div>
            </div>
        ))}
    </div>
);

/* ── Category Section ────────────────────────────────────── */
const CategorySection = ({ category, onAddToCart, onAddToWishlist, wishlist, onView }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});
    const sectionRef = useRef(null);

    useEffect(() => {
        const slug = category.name.toLowerCase().replace(/\s+/g, '-');
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${slug}`)
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : [];
                setProducts(data);
                const initQty = data.reduce((acc, p) => { acc[p._id] = 1; return acc; }, {});
                setQuantities(initQty);
            })
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [category.name]);

    const sectionId = `cat-${category.name.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <section className="pp-section container-fluid" id={sectionId} ref={sectionRef}>
            <div className="container">
                {/* Section Header */}
                <div className="pp-section-header">
                    <div>
                        <h2 className="pp-section-title">
                            {category.name}
                            {!loading && (
                                <span className="pp-section-count">{products.length} items</span>
                            )}
                        </h2>
                    </div>
                </div>

                {/* Products */}
                {loading ? (
                    <SkeletonRow />
                ) : products.length === 0 ? (
                    <div className="pp-empty">
                        <i className="bi bi-box-seam" />
                        No products available in this category yet.
                    </div>
                ) : (
                    <div className="pp-product-grid">
                        {products.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                quantities={quantities}
                                setQuantities={setQuantities}
                                onAddToCart={onAddToCart}
                                onAddToWishlist={onAddToWishlist}
                                wishlist={wishlist}
                                onView={onView}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
const ProductsPage = ({ onAddToCart, onAddToWishlist, wishlist = [] }) => {
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeNav, setActiveNav] = useState('');

    /* Fetch categories */
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : [];
                setCategories(data);
                if (data.length) setActiveNav(data[0].name);
            })
            .catch(() => setCategories([]))
            .finally(() => setCatLoading(false));
    }, []);

    /* Scroll to category section */
    const scrollToCategory = (catName) => {
        const id = `cat-${catName.toLowerCase().replace(/\s+/g, '-')}`;
        const el = document.getElementById(id);
        if (el) {
            const offset = 80; // account for sticky nav
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        setActiveNav(catName);
    };

    return (
        <div>
            {/* ── Hero ── */}
            <div className="pp-hero">
                <h1 className="pp-hero-title">Our Products</h1>
                <p className="pp-hero-subtitle">Crafted with devotion &amp; tradition</p>
                <div className="pp-hero-divider" />
            </div>

            {/* ── Sticky Category Nav ── */}
            <div className="pp-cat-nav">
                <span className="pp-cat-nav-label">Categories:</span>
                {catLoading
                    ? [...Array(4)].map((_, i) => (
                        <div key={i} className="pp-skeleton" style={{ width: 100, height: 30, borderRadius: 20 }} />
                    ))
                    : categories.map(cat => (
                        <button
                            key={cat._id}
                            className={`pp-cat-pill ${activeNav === cat.name ? 'active' : ''}`}
                            onClick={() => scrollToCategory(cat.name)}
                        >
                            {cat.name}
                        </button>
                    ))
                }
            </div>

            {/* ── Category Sections ── */}
            <div className="pp-body">
                {catLoading ? (
                    <div className="container py-5">
                        <SkeletonRow />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="pp-empty" style={{ paddingTop: 80 }}>
                        <i className="bi bi-exclamation-circle" />
                        No categories found. Please check back later.
                    </div>
                ) : (
                    categories.map(cat => (
                        <CategorySection
                            key={cat._id}
                            category={cat}
                            onAddToCart={onAddToCart}
                            onAddToWishlist={onAddToWishlist}
                            wishlist={wishlist}
                            onView={setSelectedProduct}
                        />
                    ))
                )}
            </div>

            {/* ── Product Detail Modal ── */}
            {selectedProduct && (
                <ErrorBoundary>
                    <ProductDetail
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onAddToCart={onAddToCart}
                    />
                </ErrorBoundary>
            )}
        </div>
    );
};

export default ProductsPage;
