package app.web.domain.Enums;

public enum EmailType {

    VERIFY("Verify"),
    WELCOME("Welcome");

    private final String typeDescription;

    EmailType(String typeDescription) {
        this.typeDescription = typeDescription;
    }

    public String getTypeDescription() {
        return typeDescription;
    }

    public static EmailType getNameByValue(String value) {
        for (int i = 0; i < EmailType.values().length; i++) {
            if (value.equals(EmailType.values()[i].getTypeDescription()))
                return EmailType.values()[i];
        }
        return null;
    }
}
