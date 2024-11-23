import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Input, Form } from "antd";

const App = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (values) => {
        try {
            if (editingProduct) {
                await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, values);
            } else {
                await axios.post("http://localhost:5000/api/products", values);
            }
            fetchProducts();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
        }
    };

    const columns = [
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Preço de Custo",
            dataIndex: "costPrice",
            key: "costPrice",
        },
        {
            title: "Preço de Venda",
            dataIndex: "salePrice",
            key: "salePrice",
        },
        {
            title: "Quantidade",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Ações",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Editar
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        Deletar
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestão de Produtos</h1>
            <Button type="primary" onClick={handleCreate} style={{ marginBottom: "20px" }}>
                Adicionar Produto
            </Button>
            <Table dataSource={products} columns={columns} rowKey="id" />
            <Modal
                title={editingProduct ? "Editar Produto" : "Adicionar Produto"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form
                    initialValues={editingProduct}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Nome"
                        rules={[{ required: true, message: "Por favor, insira o nome do produto" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="costPrice"
                        label="Preço de Custo"
                        rules={[{ required: true, message: "Por favor, insira o preço de custo" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="salePrice"
                        label="Preço de Venda"
                        rules={[{ required: true, message: "Por favor, insira o preço de venda" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Quantidade"
                        rules={[{ required: true, message: "Por favor, insira a quantidade" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Salvar
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default App;