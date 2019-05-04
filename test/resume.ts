// import { ParagraphStyle } from "@gbozee/docx";

// function generateStyles(
//   styles: { [x: string]: any; textTransform?: string },
//   id: string,
//   name: string,
//   kind = "paragraph"
// ) {
//   let options: { [key: string]: any } = {
//     paragraph: ParagraphStyle
//   };
//   let mapping: { [key: string]: any } = {
//     textTransform: {
//       uppercase: "allCaps"
//     },
//     color: "color",
//     fontWeight: {
//       bold: "bold"
//     },
//     fontStyle: {
//       italic: "italics"
//     },
//     fontFamily: "font",
//     fontSize: "size"
//   };
//   let klass = options[kind];
//   let paragraphhStyle = new klass(id, name);
//   for (let i in styles) {
//     if (Object.keys(mapping).includes(i)) {
//       let value = styles[i];
//       let classification = mapping[i];
//       if (typeof classification === "string") {
//         paragraphhStyle = paragraphhStyle[classification](value);
//       } else {
//         paragraphhStyle = paragraphhStyle[classification[value]]();
//       }
//     }
//   }
//   return paragraphhStyle;
// }
// describe("Styles", () => {
//   it("generate Style from object", () => {
//     let styles = {
//       textTransform: "uppercase",
//       color: "red",
//       fontWeight: "bold",
//       fontSize: 20
//     };
//     expect(
//       generateStyles(styles, "textTransform", "Text Transform")
//     ).toMatchSnapshot();
//   });
//   it("generate Stylw without caps", () => {
//     expect(
//       new ParagraphStyle("textTransform", "Text Transform").allCaps()
//     ).toMatchSnapshot();
//   });
// });
