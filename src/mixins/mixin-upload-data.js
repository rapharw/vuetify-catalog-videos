export const mixinUploadData = {
    data: () => ({
        dialogRemove: false,
        //form validation pesquisa
        valid: false,

        //expansion panel
        painel: [true],

        publicacaoDate: new Date().toISOString().substr(0, 10),
        endDate: null,
        menu: false,
        menu2: false,

        buttonDisabled: false,

        //atributos do form de upload:
        tituloVideo: "",
        descricaoVideo: "",
        tags: "",
        fileVideo: "",
        fileImage: "",

        arrayTags: [],
        arrayTagsEdit: [],
        chip: true,
        videoToEdit: null,

        dialog: false,
        videoToRemove: "",
        tagToRemove: "",
        nomeTagToRemove: ""
    })
}