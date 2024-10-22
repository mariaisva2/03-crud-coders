import { Icoder } from "@/models/coders/coder.model";
import { CodersService } from "@/services/coders.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const initialForm: Icoder = {
  id: "",
  name: "",
  avatar: "https://picsum.photos/200", // Valor por defecto para el avatar
  createdAt: new Date().toISOString(), // Asignado automáticamente al crear
};

interface CodersFormProps {
  selectedCoder: Icoder | null;
  setSelectedCoder: (coder: Icoder | null) => void;
}

// Styled-components para el formulario
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Form = styled.form`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #7d0f7c;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #540853;
  }
`;

const Button = styled.button`
  background-color: #7d0f7c;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #540853;
  }
`;

const CodersForm: React.FC<CodersFormProps> = ({
  selectedCoder,
  setSelectedCoder,
}) => {
  const [newCoder, setNewCoder] = useState<Icoder>(initialForm);
  const userCoderService = new CodersService();
  const router = useRouter();

  useEffect(() => {
    if (selectedCoder) {
      setNewCoder(selectedCoder); // Cargar datos para edición
    } else {
      setNewCoder(initialForm); // Reiniciar el formulario
    }
  }, [selectedCoder]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoder({ ...newCoder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCoder) {
      await userCoderService.update(newCoder.id, newCoder); // Actualizar
      setSelectedCoder(null); // Limpiar selección después de editar
    } else {
      await userCoderService.create(newCoder); // Crear nuevo coder
    }
    router.refresh();
    setNewCoder(initialForm); // Reiniciar formulario
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={newCoder.name}
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="avatar"
          value={newCoder.avatar}
          placeholder="Avatar (URL de la imagen)"
          onChange={handleChange}
          required
        />
        <Button type="submit">
          {selectedCoder ? "Actualizar Coder" : "Crear codificador"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CodersForm;
