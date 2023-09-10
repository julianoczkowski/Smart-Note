const { widget } = figma;
const { Frame, Input, Rectangle, Text, useSyncedState, usePropertyMenu } =
  widget;

type Color =
  | "#699BF7"
  | "#FF33CC"
  | "#FF8577"
  | "#FFC82D"
  | "#0FA958"
  | "#B6162A"
  | "#9933FF"
  | "#C1C1C1";

const fills: Color[] = [
  "#699BF7",
  "#FF33CC",
  "#FF8577",
  "#FFC82D",
  "#0FA958",
  "#B6162A",
  "#9933FF",
  "#C1C1C1",
];

const textColors: { [k in Color]: string } = {
  "#699BF7": "#ffffff",
  "#FF33CC": "#ffffff",
  "#FF8577": "#ffffff",
  "#FFC82D": "#000000",
  "#0FA958": "#000000",
  "#B6162A": "#ffffff",
  "#9933FF": "#ffffff",
  "#C1C1C1": "#000000",
};

function Widget() {
  const [text, setText] = useSyncedState("text", "");
  const [open, setOpen] = useSyncedState("open", true);
  const [color, setColor] = useSyncedState<Color>("color", "#FFC82D");
  const [size, setSize] = useSyncedState("size", 50);
  const [mode, setMode] = useSyncedState("mode", false);

  const extraSmallShadow: WidgetJSX.Effect = {
    type: "drop-shadow",
    color: "#000",
    offset: { x: 1.11, y: 1.11 },
    blur: 0,
    showShadowBehindNode: false,
  };

  const otherShadow: WidgetJSX.Effect = {
    type: "drop-shadow",
    color: "#000",
    offset: { x: 3, y: 3 },
    blur: 0,
    showShadowBehindNode: false,
  };

  const shadow = size === 25 ? extraSmallShadow : otherShadow;
  const uniqueStroke = size === 25 ? 1.5 : 2;

  usePropertyMenu(
    open
      ? [
          {
            itemType: "color-selector",
            options: fills.map((a) => ({ tooltip: a, option: a })),
            selectedOption: color,
            tooltip: "Color",
            propertyName: "color",
          },
          {
            itemType: "dropdown",
            options: [
              { option: "25", label: "Extra Small" },
              { option: "50", label: "Small" },
              { option: "75", label: "Medium" },
            ],
            selectedOption: size.toString(),
            tooltip: "Size",
            propertyName: "size",
          },
          {
            itemType: "action",
            tooltip: "Mode",
            propertyName: "mode",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
            <circle cx="32" cy="32" r="12" fill="${
              mode ? color : "#FFF"
            }" stroke="${color}" stroke-width="6" />
            </svg>`,
          },
        ]
      : [],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "color" && propertyValue) {
        setColor(propertyValue as Color);
      } else if (propertyName === "size" && propertyValue) {
        setSize(Number(propertyValue));
      } else if (propertyName === "mode") {
        setMode(!mode);
      }
    }
  );

  const fontSize = size * 0.32;
  const padding = size * 0.4;
  const strokeWidth = size * 0.1;
  const width: WidgetJSX.Size = size * 8;

  const cornerRadius: WidgetJSX.CornerRadius = {
    topLeft: size,
    topRight: size,
    bottomLeft: size,
    bottomRight: open ? strokeWidth : size,
  };

  return (
    <Frame name="Widget" overflow="visible" width={size} height={size}>
      <Input
        fontSize={fontSize}
        fontWeight="normal"
        fill={mode ? textColors[color] : "#000"}
        inputFrameProps={{
          cornerRadius: strokeWidth,
          effect: shadow,
          fill: mode ? color : "#FFF",
          hidden: !open,
          horizontalAlignItems: "center",
          overflow: "visible",
          padding,
          stroke: "#000",
          strokeWidth: uniqueStroke,
          verticalAlignItems: "center",
        }}
        onTextEditEnd={(e) => setText(e.characters.trim())}
        placeholder="...start typing (shift+enter for a new line)"
        value={text}
        width={width}
        x={size}
        y={size}
      />
      <Rectangle
        cornerRadius={cornerRadius}
        effect={shadow}
        fill={mode ? "#000" : "#FFF"}
        height={size}
        width={size}
        stroke="#000"
        strokeWidth={uniqueStroke}
      />
      <Rectangle
        cornerRadius={cornerRadius}
        fill={color}
        height={size}
        width={size}
        hoverStyle={{ opacity: 0.7 }}
        onClick={() => setOpen(!open)}
        stroke="#000"
        strokeWidth={uniqueStroke}
      />
    </Frame>
  );
}

widget.register(Widget);
