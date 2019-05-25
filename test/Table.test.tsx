import React from "react";
import { Document, Table, Section } from "../src/react-docx/node";
const Component = ({ children }) => (
  <Document>
    <Table>{children}</Table>
  </Document>
);
describe("Table", () => {
  test("simple table component without column and cell", async () => {
    const doc = (
      <Component>
        <Table.Row>
          <Section>Hello</Section>
        </Table.Row>
        <Table.Row>World</Table.Row>
      </Component>
    );
  });
  test("table with single cell", async () => {
    const doc = (
      <Component>
        <Table.Row>
          <Table.Cell>
            <Section>Hello</Section>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>World</Table.Cell>>
        </Table.Row>
      </Component>
    );
  });
  test("table with multiple cells which determine the columns", async () => {
    const doc = (
      <Component>
        <Table.Row>
          <Table.Cell>Hello</Table.Cell>
          <Table.Cell>World</Table.Cell>
        </Table.Row>
      </Component>
    );
  });
  test("table properties", async()=>{

  })
  test("cell properties", async ()=>{
    
  })
});
