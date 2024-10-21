"use client";

import { Icoder } from "@/models/coders/coder.model";
import { CodersService } from "@/services/coders.service";
import { useRouter } from "next/navigation";

interface IProps {
    data: Icoder[];
}

function CodersTable({ data }: IProps) {
    const useCoderService = new CodersService();
    const router = useRouter();

    const handleDelete = async (id: string) => {
        await useCoderService.destroy(id);
        router.refresh();
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Avatar</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((coder, index) => (
                    <tr key={index}>
                        <td>{coder.id}</td>
                        <td>{coder.name}</td>
                        <td>{coder.avatar}</td>
                        <td>
                            <button>Editar</button>
                            <button onClick={() => handleDelete(coder.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CodersTable;
