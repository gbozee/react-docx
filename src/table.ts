// Multiple cells merging in the same table
// Import from 'docx' rather than '../build' if you install from npm
import {
  Document,
  Paragraph,
  RelativeHorizontalPosition,
  TableAnchorType,
  RelativeVerticalPosition,
  WidthType,
  BorderStyle
} from "@gbozee/docx";

function createTable(doc: Document, position = "right") {
  let options: { [key: string]: RelativeHorizontalPosition } = {
    right: RelativeHorizontalPosition.RIGHT,
    left: RelativeHorizontalPosition.LEFT
  };
  const table = doc.createTable({
    rows: 1,
    columns: 2,
    float: {
      horizontalAnchor: TableAnchorType.MARGIN,
      verticalAnchor: TableAnchorType.MARGIN,
      relativeHorizontalPosition: options[position],
      relativeVerticalPosition: RelativeVerticalPosition.BOTTOM
    },
    width: 45,
    widthUnitType: WidthType.PERCENTAGE
  });
  table.setFixedWidthLayout();
  return table;
}
export function buildTable(doc: Document) {
  const table = createTable(doc);
  const table1 = createTable(doc, "left");

  table.getCell(0, 0).addParagraph(new Paragraph("Hello"));
  table
    .getRow(0)
    .mergeCells(0, 1)
    .Borders.addBottomBorder(BorderStyle.NONE, 1, "black");
  table1.getCell(0, 0).addParagraph(new Paragraph("Left Table"));

  doc.addTable(table);
  doc.addTable(table1);
  return doc;
}
