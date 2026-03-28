import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type Category = {
    name : Text;
    description : Text;
  };

  type Bakery = {
    name : Text;
    address : Text;
    categories : [Category];
  };

  let bakeries = Map.empty<Text, Bakery>();

  // Bakery management
  public shared ({ caller }) func createBakery(name : Text, address : Text) : async () {
    if (bakeries.containsKey(name)) { Runtime.trap("Bakery already exists.") };
    let bakery : Bakery = {
      name;
      address;
      categories = [];
    };
    bakeries.add(name, bakery);
  };

  public shared ({ caller }) func addCategory(bakeryName : Text, categoryName : Text, description : Text) : async () {
    switch (bakeries.get(bakeryName)) {
      case (null) { Runtime.trap("Bakery does not exist.") };
      case (?bakery) {
        let newCategory : Category = {
          name = categoryName;
          description;
        };
        let updatedCategories = bakery.categories.concat([newCategory]);
        let updatedBakery : Bakery = {
          name = bakery.name;
          address = bakery.address;
          categories = updatedCategories;
        };
        bakeries.add(bakeryName, updatedBakery);
      };
    };
  };

  // Queries
  public query ({ caller }) func getBakery(name : Text) : async Bakery {
    switch (bakeries.get(name)) {
      case (null) { Runtime.trap("Bakery does not exist.") };
      case (?bakery) { bakery };
    };
  };

  public query ({ caller }) func listBakeries() : async [Bakery] {
    bakeries.values().toArray();
  };
};
