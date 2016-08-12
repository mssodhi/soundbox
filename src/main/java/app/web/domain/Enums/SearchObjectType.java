package app.web.domain.Enums;


public enum SearchObjectType {

    SONG("Song"),
    USER("User");

    private final String typeDescription;

    SearchObjectType(String typeDescription) {
        this.typeDescription = typeDescription;
    }

    public String getTypeDescription() {
        return typeDescription;
    }

    public static SearchObjectType getNameByValue(String value) {
        for (int i = 0; i < SearchObjectType.values().length; i++) {
            if (value.equals(SearchObjectType.values()[i].getTypeDescription()))
                return SearchObjectType.values()[i];
        }
        return null;
    }
}
