//Entrega desafio clase
export default class ProductRepository {
    constructor(dao) {
      this.dao = dao;
    }
    createProduct = (product) => {
      return this.dao.save(product);
    };
    getAllProducts = () => {
      return this.dao.getAll();
    };
    getProductById = (pid) => {
      return this.dao.getById(pid);
    };
    updateProduct = (pid, product) => {
      return this.dao.update(pid, product);
    };
    deleteProduct = (pid) => {
      return this.dao.delete(pid);
    };
  }