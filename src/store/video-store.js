import axios from "@/plugins/axios";
import {
	store
} from "@/store";

function getHeader(commit, edit) {
	return edit === true ? //EDIT
		{
			headers: {
				"Content-Type": "multipart/form-data"
			}
		} : //UPLOAD
		{
			headers: {
				"Content-Type": "multipart/form-data"
			},
			onUploadProgress: function (progressEvent) {
				commit(
					"setProgressUpload",
					parseInt(
						Math.round((progressEvent.loaded * 100) / progressEvent.total)
					)
				);
			}.bind(this)
		};
}

function showProgressBar(commit, payload) {
	if (!payload.edit) {
		commit("setSnackbarProgressUpload", {
			show: true,
			color: "#1b365d",
			text: payload,
			timeout: 10000
		});
	}
}

export default {
	state: {
		listVideos: [],
		video: null,
		url: null,
		progressUpload: 0,
		snackbarProgressUpload: {}
	},
	mutations: {
		setListVideos(state, payload) {
			state.listVideos = payload;
		},
		setVideo(state, payload) {
			state.video = payload;
		},
		setUrl(state, payload) {
			state.url = payload;
		},
		setProgressUpload(state, payload) {
			state.progressUpload = payload;
		},
		setSnackbarProgressUpload(state, payload) {
			state.snackbarProgressUpload = payload;
		}
	},
	actions: {
		/*
		 * [ADM]
		 * Realiza o upload do vídeo
		 */
		uploadVideo({
			commit
		}, payload) {
			return new Promise((resolve, reject) => {
				//Se for edição, PUT. Se for upload, POST.
				let axiosMethod = payload.edit === true ? axios.put : axios.post;
				let operacao = payload.edit === true ? "Edição" : "Upload";

				let headerMethod = getHeader(commit, payload.edit);

				//Se for upload, exibe progressbar de upload do arquivo
				showProgressBar(commit, payload);

				axiosMethod("/adm/video", payload.formData, headerMethod)
					.then(() => {
						//exibe msg de sucesso
						store.dispatch(
							"showSnackSucces",
							`${operacao} do vídeo ${
								payload.tituloVideo
							} realizado com sucesso`
						);
						resolve(payload.tituloVideo);
					})
					.catch(e => {
						//exibe msg de erro
						let errorMsg =
							e.response !== undefined &&
							e.response.data !== undefined &&
							e.response.data.message !== undefined ?
							e.response.data.message :
							"";
						store.dispatch(
							"showSnackError",
							`Erro ao realizar ${operacao.toLowerCase()} do vídeo. ${errorMsg}`
						);
						reject(e);
					})
					.finally(() => {
						//finaliza barra de progressUpload
						commit("setSnackbarProgressUpload", {
							show: false
						});
						//zera o contador da barra de progresso
						commit("setProgressUpload", 0);
					});
			});
		},

		/*
		 * [ADM]
		 * Busca o catálogo de vídeos paginado. Primeira consulta traz 5 (definido no backend)
		 */
		listVideosPageable({
			commit
		}, payload) {
			return new Promise((resolve, reject) => {
				//     axios
				//         .get(`/adm/video?page=${payload.page}`)
				//         .then(response => {
				//             commit("setListVideos", response.data.content);

				//             let pageable = {
				//                 totalPages: response.data.totalPages,
				//                 last: response.data.last
				//             }

				//             resolve(pageable);
				//         })
				//         .catch(e => {
				//             store.dispatch(
				//                 "showSnackError",
				//                 `Erro ao carregar catálogo de vídeos`
				//             );
				//             reject(e);
				//         });
				// });
				commit("setListVideos", [{
					titulo: "Sample",
					descricao: "Description of sample",
					url: {
						urlVideo: "http://techslides.com/demos/sample-videos/small.mp4",
						urlImage: "https://googlechrome.github.io/samples/picture-element/images/butterfly.jpg"
					},
					tagsVO: [{
							id: 1,
							nomeTag: "tag1"
						},
						{
							id: 2,
							nomeTag: "tag2"
						}
					]
				}]);

				resolve({
					totalPages: 1,
					last: 1
				});
			});
		},

		/*
		 * [ADM]
		 * Remove uma tag do id do vídeo
		 */
		removeTag({
			commit
		}, payload) {
			return new Promise((resolve, reject) => {
				axios
					.post(`/adm/video/${payload.idVideo}/tag/${payload.idTag}`)
					.then(() => {
						store.dispatch(
							"showSnackSucces",
							`Tag ${payload.nomeTag} removida com sucesso`
						);
						resolve();
					})
					.catch(e => {
						store.dispatch(
							"showSnackError",
							`Erro ao remover tag ${payload.nomeTag}`
						);
						reject(e);
					});
			});
		},

		/*
		 * [PUBLIC]
		 * Busca a url de video e imagem referente ao ID informado
		 */
		getUrl({
			commit
		}, payload) {
			return new Promise((resolve, reject) => {
				axios
					.get(`/public/video/${payload}`)
					.then(response => {
						commit("setUrl", response.data);
						resolve();
					})
					.catch(() => {
						reject();
					});
			});
		},

		/*
		 * [ADM]
		 * Remove um vídeo permanentemente
		 */
		removeVideo({
			commit
		}, payload) {
			return new Promise((resolve, reject) => {
				axios
					.put(`/adm/video/${payload.idVideo}`)
					.then(() => {
						store.dispatch("showSnackSucces", `Vídeo removido com sucesso`);
						resolve();
					})
					.catch(e => {
						store.dispatch("showSnackError", `Erro ao remover vídeo`);
						reject(e);
					});
			});
		}
	},
	getters: {
		listVideos(state) {
			return state.listVideos;
		},
		getVideo(state) {
			return state.video;
		},
		getUrl(state) {
			return state.url;
		},
		getProgressUpload(state) {
			return state.progressUpload;
		},
		getSnackbarProgressUpload(state) {
			return state.snackbarProgressUpload;
		}
	}
};