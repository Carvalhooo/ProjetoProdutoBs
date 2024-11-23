import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ nome: "", precoCusto: 0, precoVenda: 0, quantidade: 0 });

    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:5000/api/produtos");
        setProducts(response.data);
    };

    const addProduct = async () => {
        await axios.post("http://localhost:5000/api/produtos", form);
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Produtos</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.nome} - R${product.precoVenda} ({product.quantidade})
                    </li>
                ))}
            </ul>
            <form onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
                <input type="text" placeholder="Nome" onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                <input type="number" placeholder="Preço de Custo" onChange={(e) => setForm({ ...form, precoCusto: e.target.value })} />
                <input type="number" placeholder="Preço de Venda" onChange={(e) => setForm({ ...form, precoVenda: e.target.value })} />
                <input type="number" placeholder="Quantidade" onChange={(e) => setForm({ ...form, quantidade: e.target.value })} />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default ProductList;
