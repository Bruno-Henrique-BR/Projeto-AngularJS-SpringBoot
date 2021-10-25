var myApp = angular.module('myApp', ['ui.grid', 'ui.grid.pagination', 'ui.grid.exporter', 'ui.grid.resizeColumns', 'ui.grid.moveColumns','ui.grid.autoResize']);

myApp.controller('IndexController', function IndexController($scope, $http) {

    $scope.pessoas = [];
    $scope.pessoasReport = [];
    $scope.pessoaSave = {};
    
    $scope.filtro = {};

    $scope.gridOptions1 = {
        data: [],
        dataSource: {
            autoBind: false,
            url: "http://localhost:8080/api/pessoas",
        },
        paginationPageSizes: [10, 20, 30, 40, 50, 75],
        paginationPageSize: 10,
        enablePaginationControls: true,
        enableFiltering: true,
        columnDefs: [
            { field: 'id', name: 'Código', cellTooltip: true  },
            { field: 'nome', name: 'Nome', cellTooltip: true  },
            { field: 'telefone', name: 'Telefone', cellTooltip: true  },
            { field: 'email', name: 'Email', cellTooltip: true  },
            { field: 'empresa', name: 'Empresa' , cellTooltip: true },
            { field: 'Ações', cellTemplate: '<button title="Excluir contato" style="width:100%"; ng-click="grid.appScope.Excluir(row.entity.id)" class="btn btn-sm btn-danger">  <i class="fa fa-trash"></i> </button>'}, 
            { field: 'Açoes', cellTemplate:'<button title="Editar contato" style="width:100%;" ng-click="grid.appScope.ConsultarPessoa(row.entity.id)" class=" btn btn-sm btn-info">  <i class="fa fa-edit"></i> </button>'},
        ],
    };

    $scope.ConsultarPessoas = function () {
        $http.get("http://localhost:8080/api/pessoas").success(function (data) {
            $scope.gridOptions1.data = data;
            $scope.pessoas = data;
            $scope.pessoasReport = [];
            data.forEach(element => {
                $scope.pessoasReport.push([element.id, element.nome, element.telefone,
                element.email, element.empresa]);
            });
        });

    }

    $scope.ConsultarPessoa = function (id) {
        $http.get("http://localhost:8080/api/pessoa/" + id).success(function (data) {
            $scope.pessoaSave = data;
            $('#modalPessoaEdit').modal('show');
        });
    }

    $scope.Excluir = function (id) {
        $http.delete("http://localhost:8080/api/pessoa/" + id).success(function (data) {
            $scope.pessoaSave = data;
            $scope.ConsultarPessoas();
            alert("Contato deletado com sucesso! ");
        });
    }


    $scope.GerarRelatorioPessoas = function () {

        var header = function (data) {
            doc.setFontSize(12);
            doc.setTextColor(40);
            doc.text("Relatório de Contatos", 20, 10);
        };

        var doc = new jsPDF();
        doc.autoTable({
            head: [['Código', 'Nome', 'Telefone', 'Email', 'Empresa']],
            body: $scope.pessoasReport,
            didDrawPage: header
        });
        doc.save('RelatórioContatos.pdf');
    }

    

    $scope.SalvarPessoa = function (pessoa) {

        $http.post("http://localhost:8080/api/pessoa", pessoa).success(function (data) {
            $('#modalPessoa').modal('hide');
            $scope.ConsultarPessoas();
            alert("Contato salvo com sucesso! ");
        });
    }

    $scope.SalvarPessoaExistente = function (pessoa) {
        debugger;
        $http.put("http://localhost:8080/api/pessoa", pessoa).success(function (data) {
            $('#modalPessoaEdit').modal('hide');
            $scope.ConsultarPessoas();
            alert("Contato atualizado com sucesso! ");
        });
    }
    $scope.ConsultarPessoas();

});