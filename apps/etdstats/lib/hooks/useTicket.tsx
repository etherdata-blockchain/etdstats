import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { initializeFirebase } from "../models/Firebase";

export type Status = "open" | "solved" | "closed" | "solved";

export interface Ticket {
  title: string;
  description: string;
  relatedHash: string;
  relatedHashType: string;
  time: Date;
  author: string;
  status: Status;
  checkedCount: number;
}

interface Props {
  filter?: Status;
}

export default function useTicket({ filter }: Props) {
  const router = useRouter();

  const tickets = useQuery(["ticket", filter], async () => {
    const status = filter ?? "open";

    const db = getFirestore(initializeFirebase());
    const coll = collection(db, "tickets");
    const q = query(coll, where("status", "==", status), limit(10));
    const results = await getDocs(q);
    return results.docs.map((doc) => doc.data() as Ticket);
  });

  const createTicket = useCallback(async (data: Ticket) => {
    const db = getFirestore(initializeFirebase());
    await addDoc(collection(db, "tickets"), data);
    router.push("/issues");
  }, []);

  return { createTicket, tickets };
}
