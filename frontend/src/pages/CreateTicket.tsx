import { useState } from "react";
import { createTicket } from "../api/ticketApi";

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTicket({ title, description });
    alert("Ticket created");
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Ticket</h2>
      <input onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea onChange={e => setDescription(e.target.value)} />
      <button>Create</button>
    </form>
  );
}
