import moment from "moment";
export const mixinUploadComputed = {
    computed: {
        progressUpload() {
            return this.$store.getters.getProgressUpload;
        },
        snackbarProgressUpload() {
            return this.$store.getters.getSnackbarProgressUpload;
        },

        computedDateFormattedPublicacao() {
            return this.publicacaoDate ?
                moment(this.publicacaoDate)
                .format("DD/MM/YYYY") :
                "";
        },

        computedDateFormattedEnd() {
            return this.endDate ? moment(this.endDate).format("DD/MM/YYYY") : "";
        },
        title() {
            if (this.videoToEdit !== null) {
                return "Edit";
            } else {
                return "Upload";
            }
        },
        subtitle() {
            if (this.videoToEdit !== null) {
                return "Edit your video";
            } else {
                return "Basic info";
            }
        },
        iconTitle() {
            if (this.videoToEdit !== null) {
                return "edit";
            } else {
                return "cloud_upload";
            }
        }
    }
}