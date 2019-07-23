export const btnPropsMixins = {
  props: {
    btnColor: {
      type: String,
      required: false,
      default: "primary",
      description: "Define a color of the button"
    },
    btnText: {
      type: String,
      required: false,
      description: "Define a text of the button"
    },
    btnIcon: {
      type: String,
      required: false,
      default: undefined,
      description: "Define a icon of the button"
    },
    btnFlat: {
      type: Boolean,
      required: false,
      default: false,
      description: "Removes the button background color"
    },
    btnDark: {
      type: Boolean,
      required: false,
      default: false,
      description: "Applies the dark theme variant"
    },
    btnOutline: {
      type: Boolean,
      required: false,
      default: false,
      description: "Button will have an outline"
    },
    btnClick: {
      type: Function,
      required: true
    }
  }
};
