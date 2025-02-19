import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

/**
 * id - Identificador único de cada task
 * title - Título da task
 * description - Descrição detalhada da task
 * completed_at - Data de quando a task foi concluída. O valor inicial deve ser null
 * created_at - Data de quando a task foi criada.
 * updated_at - Deve ser sempre alterado para a data de quando a task foi atualizada.
 */

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks", null);

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "title is required" }));
      }

      if (!description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "description is required" }));
      }

      const created_at = new Date();
      const updated_at = created_at;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at,
        updated_at,
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const taskSelected = database.select("tasks", { id });

      if (!taskSelected) {
        return res.writeHead(404).end();
      }

      const { completed_at, created_at } = taskSelected[0];

      const task = {
        id,
        title,
        description,
        updated_at: new Date(),
        completed_at,
        created_at,
      };

      database.update("tasks", id, task);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const taskSelected = database.select("tasks", { id });

      if (!taskSelected) {
        return res.writeHead(404).end();
      }

      const { completed_at, created_at, title, description } = taskSelected[0];

      if (completed_at) {
        return res.writeHead(400).end();
      }

      const task = {
        id,
        title,
        description,
        updated_at: new Date(),
        completed_at: new Date(),
        created_at,
      };

      database.update("tasks", id, task);

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const taskSelected = database.select("tasks", { id });

      if (!taskSelected) {
        return res.writeHead(404).end();
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
];
