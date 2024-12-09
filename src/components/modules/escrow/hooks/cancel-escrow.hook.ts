import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/constants/firebase";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email must be at least 5 characters.",
  }),
  name: z.string().min(1, {
    message: "Name must be at least 5 characters.",
  }),
  lastName: z.string().min(1, {
    message: "Last name must be at least 5 characters.",
  }),
});

export const useCancelEscrowHook = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      lastName: "",
    },
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    const data = { ...payload };

    try {
      const res = await addDoc(collection(db, "api keys"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      if (res.id) {
        router.push("/dashboard/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { form, onSubmit };
};
