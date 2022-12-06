
// handles the text field. pass the standard nick text properties in the data object, and style using the _STYLE from MYCOSTANTS

export default class MyText extends Phaser.GameObjects.Text {
  constructor(scene, x, y, _data, _style) {
    super(scene, x, y, "");

    let data = _data, style = _style;

    this.size = style.fontSize;
    this.setFill(style.color);

    if (style.mobile && window.USER_IS_TOUCHING) style = data.mobile;

    this.myx = x;
    this.myy = y;
  
    this.x = x + data.offsetX;
    this.y = y + data.offsetY;

    this.setFontSize(`${this.size * data.fontScale}px`).setText(this.removeCData(data.text)); 
    let f = (window.CONFIG.font_override.active) ? this.setFontFamily(window.CONFIG.font_override.font) : this.setFontFamily(data.fontName);

    if (style.wordwrap) this.setWordWrapWidth(style.wordwrap);
    if (style.align) this.setAlign(style.align);
    if (style.stroke) this.setStroke(style.stroke, style.strokeThickness);

    scene.add.existing(this);
  }

  removeCData (_text) {
    let mytext = _text.replace("![CDATA[", "").replace("]]", "");
    return mytext;
  }

  changeText (_data) {

    let data = _data;

    if (data.mobile && window.USER_IS_TOUCHING) data = data.mobile;

    this.x = this.x + data.offsetX;
    this.y = this.y + data.offsetY;

    this.setFontSize(`${this.size * data.fontScale}px`).setText(this.removeCData(data.text));
    let f = (window.CONFIG.font_override.active) ? this.setFontFamily(window.CONFIG.font_override.font) : this.setFontFamily(data.fontName);
  }
  
}