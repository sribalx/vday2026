import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertValentineWish } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateWish() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertValentineWish) => {
      const res = await fetch(api.wishes.create.path, {
        method: api.wishes.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send wish");
      }
      
      return api.wishes.create.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({
        title: "Oh no! 😿",
        description: `Something went wrong: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}
