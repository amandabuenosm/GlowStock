import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ProdutosPage = () => {
    const [produtos, setProdutos] = useState([]);
    const [formulario, setForm] = useState({
      nome: '',
      codigo: '',
      preco: '',
      qtde_estoque: '',
      marca: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchProdutos();
    }, []);
  
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (isEditing) {
          await api.put(`/produtos/${editId}`, formulario);
          setIsEditing(false);
          setEditId(null);
        } else {
          await api.post('/produtos', formulario);
        }
        fetchProdutos();
        setForm({
          nome: '',
          codigo: '',
          preco: '',
          qtde_estoque: '',
          marca: '',
        });
      } catch (error) {
        console.error('Erro ao gravar produto:', error);
      }
    };
  
    const handleEdit = (produto) => {
      setIsEditing(true);
      setEditId(produto.id);
      setForm({
        nome: produto.nome,
        codigo: produto.codigo,
        preco: produto.preco,
        qtde_estoque: produto.qtde_estoque,
        marca: produto.marca || '',
      });
    };
  
    const handleDelete = async (id) => {
      try {
        await api.delete(`/produtos/${id}`);
        fetchProdutos();
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    return (
      <Box sx={{ padding: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Typography variant="h4">Controle de Produtos</Typography>
          <Button variant="outlined" color="primary" onClick={() => navigate('/')}>
            Voltar para Página Inicial
          </Button>
        </Box>
  
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Nome do Produto"
                name="nome"
                value={formulario.nome}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Código"
                name="codigo"
                type="string"
                value={formulario.codigo}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Preço do Produto"
                name="preco"
                value={formulario.preco}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Quantidade em Estoque"
                name="qtde_estoque"
                value={formulario.qtde_estoque}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Marca"
                name="marca"
                value={formulario.marca}
                onChange={handleChange}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color={isEditing ? 'warning' : 'primary'}
              >
                {isEditing ? 'Atualizar' : 'Adicionar'} Produto
              </Button>
            </Box>
          </form>
        </Paper>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome do Produto</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Quantidade em Estoque</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map((produto) => (
                <TableRow key={produto._id}>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>{produto.codigo}</TableCell>
                  <TableCell>{produto.preco}</TableCell>
                  <TableCell>{produto.qtde_estoque}</TableCell>
                  <TableCell>{produto.marca}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(produto)}
                      sx={{ marginRight: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(produto.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default ProdutosPage;
