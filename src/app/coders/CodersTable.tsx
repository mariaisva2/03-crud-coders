"use client"
import { useState } from "react";
import { Icoder } from "@/models/coders/coder.model";
import { CodersService } from "@/services/coders.service";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import CodersForm from "./CoderForm";

interface IProps {
  data: Icoder[];
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #000000;
`;

const Th = styled.th`
  background-color: #680c67;
  color: #000000;
  padding: 10px;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f1f0f0;
  }
`;

const Button = styled.button`
  background-color: #7d0f7c;
  color: #ffffff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #540853;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  border: 2px solid #7d0f7c;
  border-radius: 4px;
  font-size: 16px;
`;

function CodersTable({ data }: IProps) {
  const [selectedCoder, setSelectedCoder] = useState<Icoder | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nameInputValue, setNameInputValue] = useState<string>("");

  const userCoderService = new CodersService();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await userCoderService.destroy(id);
    router.refresh();
  };

  const handleEdit = (coder: Icoder) => {
    setSelectedCoder(coder);
  };

  const handleNameClick = (coder: Icoder) => {
    setEditingId(coder.id);
    setNameInputValue(coder.name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(e.target.value);
  };

  // Actualización mejorada
  const handleNameBlur = async (coder: Icoder) => {
    if (nameInputValue !== coder.name) { // Solo actualizar si hay cambios
      try {
        await userCoderService.update(coder.id, { ...coder, name: nameInputValue });  // Actualizamos el coder
        router.refresh();  // Refrescar solo después de actualizar
      } catch (error) {
        console.log("Error actualizando el nombre:", error);
      } finally {
        setEditingId(null);  // Limpiar estado de edición
      }
    }
  };

  // Manejo de Enter
  const handleKeyPress = async (e: React.KeyboardEvent, coder: Icoder) => {
    if (e.key === "Enter") {
      e.preventDefault();  // Evita la acción predeterminada de submit
      await handleNameBlur(coder);  // Llamar a la función de blur cuando se presiona Enter
    }
  };

  return (
    <>
      <CodersForm selectedCoder={selectedCoder} setSelectedCoder={setSelectedCoder} />
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Avatar</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((coder: Icoder) => (
            <Tr key={coder.id}>
              <Td>{coder.id}</Td>
              <Td>
                {editingId === coder.id ? (
                  <Input
                    type="text"
                    value={nameInputValue}
                    onChange={handleNameChange}
                    onBlur={() => handleNameBlur(coder)}
                    onKeyDown={(e) => handleKeyPress(e, coder)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleNameClick(coder)}>{coder.name}</span>
                )}
              </Td>
              <Td>{coder.avatar}</Td>
              <Td>
                <Button onClick={() => handleEdit(coder)}>Editar</Button>
                <Button onClick={() => handleDelete(coder.id)}>Borrar</Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CodersTable;
