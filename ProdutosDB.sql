CREATE TABLE Produtos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    PrecoCusto DECIMAL(10, 2) NOT NULL,
    PrecoVenda DECIMAL(10, 2) NOT NULL,
    Quantidade INT NOT NULL
);