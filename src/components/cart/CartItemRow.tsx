import { useCartStore, MAX_QUANTITY, MIN_QUANTITY, type CartItem } from "../../store/cartStore";
import { formatCurrency } from "../../utils/cartCalculations";

interface CartItemRowProps {
  item: CartItem;
  readOnly?: boolean;
}

export function CartItemRow({ item, readOnly = false }: CartItemRowProps) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <img src={item.thumbnail} alt={item.title} className="h-16 w-16 rounded-md object-cover" />

      <div className="flex-1">
        <p className="font-medium text-slate-900">{item.title}</p>
        <p className="text-sm text-slate-500 capitalize">{item.category}</p>
        <p className="text-sm text-slate-500">{formatCurrency(item.price)} each</p>
      </div>

      {readOnly ? (
        <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={item.quantity <= MIN_QUANTITY}
            aria-label={`Decrease quantity of ${item.title}`}
            className="h-7 w-7 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span className="w-6 text-center text-sm">{item.quantity}</span>
          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={item.quantity >= MAX_QUANTITY}
            aria-label={`Increase quantity of ${item.title}`}
            className="h-7 w-7 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>
      )}

      <p className="w-20 text-right font-medium text-slate-900">
        {formatCurrency(item.price * item.quantity)}
      </p>

      {!readOnly && (
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          aria-label={`Remove ${item.title} from cart`}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      )}
    </div>
  );
}
