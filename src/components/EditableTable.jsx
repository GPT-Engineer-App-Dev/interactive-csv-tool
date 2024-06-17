import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Button, VStack } from '@chakra-ui/react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const EditableTable = ({ data, setData }) => {
  const handleCellChange = (e, rowIndex, columnId) => {
    const newData = [...data];
    newData[rowIndex][columnId] = e.target.innerText;
    setData(newData);
  };

  const handleAddRow = () => {
    const newRow = Object.keys(data[0]).reduce((acc, key) => ({ ...acc, [key]: '' }), {});
    setData([...data, newRow]);
  };

  const handleRemoveRow = (rowIndex) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  return (
    <VStack spacing={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            {Object.keys(data[0]).map((key) => (
              <Th key={key}>{key}</Th>
            ))}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {Object.keys(row).map((columnId) => (
                <Td
                  key={columnId}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleCellChange(e, rowIndex, columnId)}
                >
                  {row[columnId]}
                </Td>
              ))}
              <Td>
                <IconButton
                  aria-label="Remove row"
                  icon={<FaTrash />}
                  onClick={() => handleRemoveRow(rowIndex)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button leftIcon={<FaPlus />} onClick={handleAddRow} colorScheme="green">
        Add Row
      </Button>
    </VStack>
  );
};

export default EditableTable;