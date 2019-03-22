// tslint:disable: variable-name
/**
 * @class Item
 */
class Item {
  public readonly ID: string;
  public readonly Icon: string;
  public readonly Name: string;
  public readonly Description: string;
  public readonly Quality: string;
  public readonly ItemType: string;
  public readonly Amount: number = 0;
  public readonly IsStackable: boolean = false;
  public readonly MaxStackSize: number = 0;
  public readonly IsDroppable: boolean = true;
  public readonly WorldMesh: string;
  public readonly Value: number = 0;
  public readonly Weight: number = 0;
  public readonly BuyPrice: number = 0;
  public readonly SalePrice: number = 0;
  public readonly ShopCategory: string;

  constructor(item) {
    this.ID = item.ID;
    this.Icon = item.Icon;
    this.Name = item.Name;
    this.Description = item.Description;
    this.Quality = item.Quality;
    this.ItemType = item.ItemType;
    this.Amount = item.Amount;
    this.IsStackable = item.IsStackable;
    this.MaxStackSize = item.MaxStackSize;
    this.IsDroppable = item.IsDroppable;
    this.WorldMesh = item.WorldMesh;
    this.Value = item.Value;
    this.Weight = item.Weight;
    this.BuyPrice = item.BuyPrice;
    this.SalePrice = item.SalePrice;
    this.ShopCategory = item.ShopCategory;
  }
}

export default Item;
