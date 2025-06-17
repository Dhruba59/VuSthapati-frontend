
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDeleteDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  title: string
}

export function ConfirmDeleteDialog({ open, onConfirm, onCancel, title }: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete? This action cannot be undone.</p>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
