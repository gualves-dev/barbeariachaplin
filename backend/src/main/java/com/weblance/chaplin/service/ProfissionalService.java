package com.weblance.chaplin.service;

import com.weblance.chaplin.model.Profissional;
import com.weblance.chaplin.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProfissionalService {

    @Autowired
    private ProfissionalRepository repository;

    public List<Profissional> listarTodos() {

        return repository.findAll();

    }

    public void verificarStatus(Long id) {

        var profissionalStatus = repository.findById(id).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        profissionalStatus.getStatus();

        String status = profissionalStatus.getStatus();

        if ("INDISPONIVEL".equals(status)) {
            throw new RuntimeException("Profissional está indisponível");

        }

    }

    public void indisponivelStatus(Long id) {

        var profissionalStatus = repository.findById(id).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        profissionalStatus.setStatus("INDISPONIVEL");

        repository.save(profissionalStatus);

    }

    public void disponivelStatus(Long id) {

        var profissionalStatus = repository.findById(id).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        profissionalStatus.setStatus("DISPONIVEL");

        repository.save(profissionalStatus);

    }

    public void emAtendimentoStatus(Long id) {

        var profissionalStatus = repository.findById(id).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        profissionalStatus.setStatus("ATENDENDO");

        repository.save(profissionalStatus);

    }

        public void emRefeicaoStatus(Long id) {

        var profissionalStatus = repository.findById(id).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        profissionalStatus.setStatus("REFEICAO");

        repository.save(profissionalStatus);

    }



    public void verificarStatusPorNome(String nome) {
    var profissional = repository.findByUsuario(nome)
        .orElseThrow(() -> new RuntimeException("Profissional não encontrado com este nome"));

    if ("INDISPONIVEL".equals(profissional.getStatus())) {
        throw new RuntimeException("O barbeiro " + nome + " está indisponível!");
    }
}

}
