using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    interface ICategoriaRepository
    {
        List<Genero> ListarCategorias();
        void CadastrarCategorias(Genero genero);
        void AtualizarCategorias(Genero genero);
    }
}
