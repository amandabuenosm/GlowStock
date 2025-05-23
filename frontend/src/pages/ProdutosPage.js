import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos();
    import ('../style/ProdutosPage.css');
  }, []);

  const navigate = useNavigate();

  const fetchProdutos = async () => {
    try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
  };

  const [formulario, setForm] = useState({
    nome: '',
    codigo: '',
    preco: '',
    qtde_estoque: '',
    marca: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const dadosusuariologado = {
        ...formulario,
        usuario_id: usuario.id, // id do usuário logado salvo
    };

    try {
        if (isEditing) {
            await api.put(`/produtos/${editId}`, dadosusuariologado);  // envio de dados ao backend
            setIsEditing(false);
            setEditId(null);
        } else {
            await api.post('/produtos', dadosusuariologado);
        }
        fetchProdutos();  // recarregar produtos para atualizar no frontend
        handleCloseDialog();
    } catch (error) {
        console.error('Erro ao gravar produto:', error.response ? error.response.data : error);
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
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
        const mensagem = error.response?.data?.error || 'Não é possível excluir este produto pois existem movimentações relacionadas a ele.';
        alert(mensagem);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenDialog = () => {
    setIsEditing(false);
    setEditId(null);
    setForm({
      nome: '',
      codigo: '',
      preco: '',
      qtde_estoque: '',
      marca: '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="produtos-container">
      <div className="produtos-header">
        <h1>Controle de Produtos</h1>
        <button onClick={() => navigate('/menuPrincipal')} className="voltar">Voltar para o Menu</button>
      </div>

      <div className="actions">
        <button onClick={handleOpenDialog}>Adicionar Produto</button>
      </div>

      <table className="dados-produtos">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código</th>
            <th>Preço</th>
            <th>Qtd Estoque</th>
            <th>Marca</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.codigo}</td>
              <td>{produto.preco}</td>
              <td>{produto.qtde_estoque}</td>
              <td>{produto.marca}</td>
              <td>
                <button type="edit" onClick={() => handleEdit(produto)}>Editar</button>
                <button type="delete" onClick={() => handleDelete(produto.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openDialog && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nome"
                placeholder="Nome do Produto"
                value={formulario.nome}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="codigo"
                placeholder="Código"
                value={formulario.codigo}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="preco"
                placeholder="Preço"
                value={formulario.preco}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="qtde_estoque"
                placeholder="Quantidade em Estoque"
                value={formulario.qtde_estoque}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="marca"
                placeholder="Marca"
                value={formulario.marca}
                onChange={handleChange}
                required
              />
              <div className="modal-actions">
                <button type="cancel" onClick={handleCloseDialog}>Cancelar</button>
                <button type="submit">{isEditing ? 'Atualizar' : 'Salvar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProdutosPage;
