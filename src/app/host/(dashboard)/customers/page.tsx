import { db } from "@/lib/db";
import { requireSessionHost } from "@/lib/auth";
import { getNationality } from "@/lib/nationality";
import { deleteCustomerAction } from "./actions";
import { AddCustomerForm } from "./add-customer-form";

export default async function HostCustomersPage() {
  const host = await requireSessionHost();
  const customers = await db.customer.findMany({
    where: { hostId: host.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">利用客管理</h2>
        <p className="mt-1 text-sm text-muted">
          事前に利用客のメールアドレスを登録してください。お客様は店頭QRからこのメールアドレスでログインします。
        </p>
      </div>

      {customers.length > 0 && (
        <div className="flex flex-col gap-3">
          {customers.map((c) => {
            const nat = getNationality(c.nationality);
            return (
              <div
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-3 card"
              >
                <div>
                  <span className="font-medium">{c.name}</span>
                  <span className="ml-2 text-sm text-muted">
                    {nat.flag} {nat.labelJa}
                  </span>
                  <div className="text-sm text-muted">{c.email}</div>
                </div>
                <form action={deleteCustomerAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <button
                    type="submit"
                    className="btn btn-danger-outline btn-sm"
                  >
                    削除
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      )}

      <AddCustomerForm />
    </div>
  );
}
