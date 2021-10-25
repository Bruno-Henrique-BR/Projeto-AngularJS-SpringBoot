package com.api.pessoa.controller;


import com.api.pessoa.model.Pessoa;
import com.api.pessoa.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value="/api")
public class PessoaController {

    @Autowired
    PessoaRepository pessoaRepository;

    @GetMapping("/pessoas")
    public List<Pessoa> listaPessoas(){
        return pessoaRepository.findAll();
    }


    @GetMapping("/pessoa/{id}")
    public Pessoa GetPessoaById(@PathVariable(value="id") long id){
        return pessoaRepository.findById(id);
    }


    @PostMapping("/pessoa")
    public Pessoa salvaPessoa(@RequestBody @Valid Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }


    @DeleteMapping("/pessoa/{id}")
    public Pessoa deletaPessoa(@PathVariable(value="id") long id){
        return pessoaRepository.deleteById(id);
    }


    @PutMapping("/pessoa")
    public Pessoa atualizaPessoa(@RequestBody @Valid Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }

}
