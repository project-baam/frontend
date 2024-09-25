import { useMutation, useQuery } from "@tanstack/react-query";
import { addAgenda, deleteAgenda, getAgenda } from "./calendar.apis";
import { AddAgendaData, AgendaData } from "./calendar.type";

export const useGetAgenda = ({ year, month }: AgendaData) => {
  return useQuery({
    queryKey: ["agenda"],
    queryFn: () => getAgenda({ year, month })
  });
};

export const useAddAgenda = () => {
  return useMutation({
    mutationFn: (data: AddAgendaData) => addAgenda(data)
  });
};

export const useDeleteAgenda = () => {
  return useMutation({
    mutationFn: (data: string) => deleteAgenda(data)
  });
};
