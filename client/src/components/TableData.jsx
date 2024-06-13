import React from "react";
import {
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";

const TableData = ({ tHead, children }) => {
    return (
        <TableContainer overflowX="auto" maxWidth={"100%"} overflowY={"hidden"} whiteSpace={"nowrap"}>
            <Table size="md" variant="simple" mb={4}>
                <Thead bg="gray.100">
                    <Tr>
                        {tHead?.map((head, index) => (
                            <Th key={index}>{head}</Th>
                        ))}
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {children}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default TableData;
