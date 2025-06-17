"use client";
import { ConfirmDeleteDialog } from "@/components/confirmation-dialog";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messagesAPI } from "@/lib/api";
import { MessagePayload } from "@/lib/models";
import React, { useEffect } from "react";

const MessagesPage = () => {
  const [modalMsg, setModalMsg] = React.useState<null | (typeof messages)[0]>(
    null
  );

  const [messages, setMessages] = React.useState<MessagePayload[]>([]);

   useEffect(() => {
    let isMounted = true;
    const fetchMessages = async () => {
      try {
        const msgs = await messagesAPI.getAll();
        if (isMounted) setMessages(msgs);
      } catch (error) {
        if (isMounted) setMessages([]);
      }
    };
    fetchMessages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <ScrollArea className="rounded-lg border shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-muted">
              <tr className="bg-gray-100">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  User Email
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {messages?.length === 0 ? (
                <tr className="border-t hover:bg-accent transition-colors">
                  <td
                    colSpan={4}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No messages found.
                  </td>
                </tr>
              ) : (
                <>
                  {messages.map((msg: MessagePayload) => {
                    const isLong = msg.message.length > 40;
                    return (
                      <tr
                        className="border-t hover:bg-accent transition-colors"
                        key={msg._id}
                      >
                        <td className="py-3 px-4">{msg.name}</td>
                        <td className="py-3 px-4">{msg.senderEmail}</td>
                        <td className="py-3 px-4">
                          {isLong ? (
                            <>
                              {msg.message.slice(0, 50)}...
                              <button
                                className="ml-2 text-blue-600 underline"
                                onClick={() => setModalMsg(msg)}
                              >
                                View
                              </button>
                            </>
                          ) : (
                            msg.message
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  <Dialog
                    open={modalMsg ? true : false}
                    onOpenChange={() => setModalMsg(null)}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Full Message</DialogTitle>
                      </DialogHeader>
                      <p>{modalMsg?.message}.</p>
                      <DialogFooter className="mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setModalMsg(null)}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </ProtectedRoute>
  );
};

export default MessagesPage;
