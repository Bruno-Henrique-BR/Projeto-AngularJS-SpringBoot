package com.api.pessoa.repository;

import com.api.pessoa.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    Pessoa findById(long id);
    Pessoa deleteById(long id);

}
