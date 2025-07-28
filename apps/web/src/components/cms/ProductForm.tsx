import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Product, CreateProductDto, UpdateProductDto } from "@/types/api";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
  onSave: (data: CreateProductDto | UpdateProductDto) => Promise<void>;
}

export function ProductForm({ open, onOpenChange, product, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState({
    code: product?.code || "",
    name: product?.name || "",
    price: product?.price || 0,
    its_ready: product?.its_ready || false,
    best_seller: product?.best_seller || false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data: CreateProductDto | UpdateProductDto = {
        ...formData,
        ...(imageFile && { img: imageFile }),
      };

      await onSave(data);
      onOpenChange(false);

      // Reset form
      setFormData({
        code: "",
        name: "",
        price: 0,
        its_ready: false,
        best_seller: false,
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>{product ? "Update product information." : "Add a new product to your menu."}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Product Code</Label>
              <Input id="code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="P001" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Nasi Goreng" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (IDR)</Label>
            <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} placeholder="25000" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
            {product?.img && !imageFile && <p className="text-sm text-muted-foreground">Current image: {product.img}</p>}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="its_ready" checked={formData.its_ready} onCheckedChange={(checked) => setFormData({ ...formData, its_ready: checked as boolean })} />
              <Label htmlFor="its_ready">Available</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="best_seller" checked={formData.best_seller} onCheckedChange={(checked) => setFormData({ ...formData, best_seller: checked as boolean })} />
              <Label htmlFor="best_seller">Best Seller</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
