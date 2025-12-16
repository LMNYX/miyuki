#!/usr/bin/env bash
set -e

SCRIPT_PATH="scripts/create-user.ts"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "create-user.ts not found at $SCRIPT_PATH"
    exit 1
fi

USERS=(
    "superadmin|Superadmin|superadmin|99"
    "admin|Admin|admin|60"
    "editor|Editor|editor|30"
    "noperms|No Perms|noperms|0"
)

echo "Creating predefined users..."

for USER in "${USERS[@]}"; do
    IFS='|' read -r USERNAME NAME PASSWORD ACCESS_LEVEL <<< "$USER"

    if [ -n "$ACCESS_LEVEL" ]; then
        pnpm run create-user -- "$USERNAME" "$NAME" "$PASSWORD" "$ACCESS_LEVEL"
    else
        pnpm run create-user -- "$USERNAME" "$NAME" "$PASSWORD"
    fi

    echo "$USERNAME created with password \"$PASSWORD\""
done

echo "All predefined users created"
