import { useMutation, useQuery } from "@tanstack/react-query";
import { addAgenda, getAgenda } from "./calendar.apis";
import { AddAgendaData, AgendaData } from "./calendar.type";

export const useGetAgenda = ({ year, month }: AgendaData) => {
  return useQuery({
    queryKey: ["id"],
    queryFn: () => getAgenda({ year, month })
  });
};

export const useAddAgenda = (data: AddAgendaData) => {
  return useMutation({
    mutationFn: (data: AddAgendaData) => addAgenda(data)
  });
};
